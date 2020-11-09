import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, Subject } from 'rxjs';
import { User } from './user';
import { ImportResponse } from './import-response';
import { MihoyoService } from '../mihoyo/mihoyo.service';
import { Banner } from './banner';
import { Item } from '../item';
import { Wish } from './wish';
import { exhaustMap, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DifferentUidDialogComponent } from '../../auth/different-uid-dialog/different-uid-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { SnackService } from '../../shared/snack/snack.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../auth/auth.service';

export enum ApiErrors {
  AUTHKEY_INVALID = 'AUTHKEY_INVALID',
  MIHOYO_UID_DIFFERENT = 'MIHOYO_UID_DIFFERENT',
  MIHOYO_UNREACHABLE = 'MIHOYO_UNREACHABLE',
}

export enum BannerType {
  NOVICE = 'NOVICE',
  PERMANENT = 'PERMANENT',
  CHARACTER_EVENT = 'CHARACTER_EVENT',
  WEAPON_EVENT = 'WEAPON_EVENT',
}

export const BannerTypes = [
  BannerType.CHARACTER_EVENT,
  BannerType.PERMANENT,
  BannerType.WEAPON_EVENT,
  BannerType.NOVICE,
];

const PITY_5_BY_TYPE = {
  NOVICE: 90,
  PERMANENT: 90,
  CHARACTER_EVENT: 90,
  WEAPON_EVENT: 80,
};

const PITY_4 = 10;

@Injectable({
  providedIn: 'root',
})
export class GenshinWishesService {
  private _updateWishes = new Subject();
  readonly onWishesUpdate$ = this._updateWishes.asObservable();

  constructor(
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _mihoyo: MihoyoService,
    private _auth: AuthService,
    private _translate: TranslateService,
    private _snack: SnackService
  ) {}

  linkMihoyoUser(): Promise<User> {
    return this._mihoyo
      .getAuthkey()
      .then((authkey) => {
        return this._http
          .get<User>('/api/user/link', {
            params: {
              authkey,
            },
          })
          .toPromise();
      })
      .catch((error) => {
        if (error.error !== ApiErrors.MIHOYO_UNREACHABLE) {
          this._mihoyo.invalidateKey();
        }

        return Promise.reject(error);
      });
  }

  getBanners(): Observable<Banner[]> {
    return this.onWishesUpdate$.pipe(
      startWith(null),
      switchMap(() =>
        this._http.get<Record<BannerType, Wish[]>>('/api/wishes/banners').pipe(
          map((records) =>
            BannerTypes.map((type) => {
              if (!records[type]) {
                return {
                  key: type,
                  title: 'wishes.banners$.' + type + '.title',
                  pity5: PITY_5_BY_TYPE[type],
                  pity4: PITY_4,
                } as Banner;
              }

              const fiveStarIndex = records[type].findIndex(
                (wish) => wish.item.rankType === 5
              );
              const fourStarIndex = records[type].findIndex(
                (wish) => wish.item.rankType === 4
              );

              return {
                key: type,
                pity5:
                  PITY_5_BY_TYPE[type] -
                  (fiveStarIndex !== -1 ? fiveStarIndex : records[type].length),
                pity4:
                  PITY_4 -
                  (fourStarIndex !== -1 ? fourStarIndex : records[type].length),
                last5:
                  fiveStarIndex !== -1 && records[type][fiveStarIndex].item,
                last4:
                  fourStarIndex !== -1 && records[type][fourStarIndex].item,
                title: 'wishes.banners$.' + type + '.title',
                wishes: records[type].length,
              } as Banner;
            })
          )
        )
      )
    );
  }

  getWishes(banner: string, page?: number): Observable<Wish[]> {
    return this._http
      .get<Wish[]>(`/api/wishes/${banner}`, {
        params: {
          page: (page || 0) + '',
        },
      })
      .pipe(
        map((wishes) =>
          wishes.map((wish) => ({ ...wish, time: new Date(wish.time) }))
        )
      );
  }

  countAll(): Observable<Record<BannerType, number>> {
    return this.onWishesUpdate$.pipe(
      startWith(null),
      switchMap(() =>
        this._http.get<Record<BannerType, number>>(`/api/wishes/count`)
      )
    );
  }

  countWishes(bannerType: string): Observable<number> {
    return this.onWishesUpdate$.pipe(
      startWith(null),
      switchMap(() => this._http.get<number>(`/api/wishes/${bannerType}/count`))
    );
  }

  getItems(): Observable<Item[]> {
    return this._http.get<Item[]>('/api/items');
  }

  updateLang(lang: string): Promise<string> {
    return this._http
      .patch(`/api/user/lang`, undefined, {
        params: {
          lang,
        },
      })
      .toPromise()
      .then(() => {
        this._snack.open('settings.lang.success$', 'settings_lang_success');

        return lang;
      })
      .catch((error) => {
        if (!error) {
          return Promise.reject();
        }

        return this._snack
          .open(
            'generics.error$',
            'settings_lang_error',
            'accent',
            'generics.retry'
          )
          .onAction()
          .pipe(exhaustMap(() => from(this.updateLang(lang))))
          .toPromise();
      });
  }

  importWishes(hideToasts?: boolean): Promise<ImportResponse | null> {
    let usedAuthkey: string | null = null;

    return this._mihoyo
      .getAuthkey()
      .then((authkey) => {
        usedAuthkey = authkey;

        return this._http
          .get<ImportResponse>('/api/wishes/import', {
            params: {
              authkey,
            },
          })
          .toPromise();
      })
      .then((res) => {
        if (!BannerTypes.find((type) => res[type] > 0)) {
          if (!hideToasts) {
            return this._snack
              .open(
                'wishes.import.noData$',
                'import_no_new_wishes',
                'accent',
                'generics.retry'
              )
              .onAction()
              .pipe(exhaustMap(() => from(this.importWishes(hideToasts))))
              .toPromise();
          }
        } else {
          if (!hideToasts) {
            this._snack.openMulti(
              BannerTypes.filter((banner) => res[banner] > 0).map((banner) => ({
                message: this._translate.instant(
                  'wishes.import.success$.message',
                  {
                    wishes: res[banner],
                    banner: this._translate.instant(
                      'wishes.banners$.' + banner + '.title'
                    ),
                  }
                ),
              })),
              'import_success',
              'wishes.import.success$.emoji'
            );
          }
          this._updateWishes.next();
        }

        return res;
      })
      .catch((error: HttpErrorResponse) => {
        if (!error) {
          return null;
        }

        if (error.error === ApiErrors.AUTHKEY_INVALID) {
          this._mihoyo.invalidateKey();
        } else if (error.error === ApiErrors.MIHOYO_UID_DIFFERENT) {
          return this._dialog
            .open(DifferentUidDialogComponent)
            .afterClosed()
            .toPromise()
            .then((res) =>
              // tslint:disable-next-line:no-non-null-assertion
              !!res ? this.deleteAndImport(usedAuthkey!) : null
            );
        }

        const errorKey =
          error.error === ApiErrors.AUTHKEY_INVALID
            ? 'wishes.import.invalidAuthkey$'
            : error.error === ApiErrors.MIHOYO_UNREACHABLE
            ? 'generics.mihoyoError$'
            : 'generics.error$';

        if (!hideToasts) {
          return this._snack
            .open(
              errorKey,
              'import_error_' + error.error,
              'accent',
              'generics.retry'
            )
            .onAction()
            .pipe(exhaustMap(() => from(this.importWishes(hideToasts))))
            .toPromise();
        }

        return null;
      });
  }

  logout(): Promise<void> {
    return this._http.post<void>('/api/logout', null).toPromise();
  }

  deleteAccount(): Promise<void> {
    return this._dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'settings.deleteAccountConfirm.title',
          description: 'settings.deleteAccountConfirm.message',
          confirm: 'settings.deleteAccount.title',
        } as ConfirmDialogData,
      })
      .afterClosed()
      .toPromise()
      .then((res) =>
        !!res
          ? this._http.delete<void>('/api/user/delete').toPromise()
          : Promise.reject()
      )
      .catch((error) => {
        if (!error) {
          return Promise.reject();
        }

        return this._snack
          .open(
            'generics.error$',
            'settings_delete_error',
            'accent',
            'generics.retry'
          )
          .onAction()
          .pipe(exhaustMap(() => from(this.deleteAccount())))
          .toPromise();
      });
  }

  private deleteAndImport(
    authkey: string
  ): Promise<Record<BannerType, number> | null> {
    return this._http
      .post<User>('/api/user/linkNew', authkey)
      .toPromise()
      .then((user) => {
        // Remove for last user
        const hadCookie = this._mihoyo.invalidateKey();
        this._auth.register(user);
        // New linked user
        this._mihoyo.registerKey(authkey, hadCookie);
      })
      .then(() => this.importWishes())
      .then((wishes) => {
        window.location.reload();

        return wishes;
      });
  }
}
