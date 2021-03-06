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
import { Params } from '@angular/router';
import { WishFilters } from '../../wishes/wish-filters/wish-filters';
import { LangService } from '../../shared/lang.service';
import { Event } from '../event';

export enum ApiErrors {
  AUTHKEY_INVALID = 'AUTHKEY_INVALID',
  MIHOYO_UID_DIFFERENT = 'MIHOYO_UID_DIFFERENT',
  MIHOYO_UNREACHABLE = 'MIHOYO_UNREACHABLE',
  NEW_WISHES_DURING_IMPORT = 'NEW_WISHES_DURING_IMPORT',
}

export enum BannerType {
  ALL = 'ALL',
  NOVICE = 'NOVICE',
  PERMANENT = 'PERMANENT',
  CHARACTER_EVENT = 'CHARACTER_EVENT',
  WEAPON_EVENT = 'WEAPON_EVENT',
}

export const IdToBanner: Record<number, string> = {
  '-1': BannerType.ALL,
  301: BannerType.CHARACTER_EVENT,
  200: BannerType.PERMANENT,
  302: BannerType.WEAPON_EVENT,
  100: BannerType.NOVICE,
};

export const BannerToId: Record<string, number> = {
  ALL: -1,
  CHARACTER_EVENT: 301,
  PERMANENT: 200,
  WEAPON_EVENT: 302,
  NOVICE: 100,
};

export const BannerTypes = [
  BannerType.CHARACTER_EVENT,
  BannerType.PERMANENT,
  BannerType.WEAPON_EVENT,
  BannerType.NOVICE,
];

const PITY_5_BY_TYPE = {
  ALL: -1,
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
    private _snack: SnackService,
    private _lang: LangService
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
                (wish) => wish.item?.rankType === 5
              );
              const fourStarIndex = records[type].findIndex(
                (wish) => wish.item?.rankType === 4
              );

              return {
                key: type,
                pity5: PITY_5_BY_TYPE[type],
                since5:
                  fiveStarIndex !== -1 ? fiveStarIndex : records[type].length,
                pity4: PITY_4,
                since4:
                  fourStarIndex !== -1 ? fourStarIndex : records[type].length,
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

  getWishes(
    banner: string,
    page: number,
    filters: WishFilters
  ): Observable<Wish[]> {
    return this._http
      .get<Wish[]>(`/api/wishes/${banner}`, {
        params: this.buildParams(page, filters),
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

  countWishes(bannerType: string, filters: WishFilters): Observable<number> {
    return this.onWishesUpdate$.pipe(
      startWith(null),
      switchMap(() =>
        this._http.get<number>(`/api/wishes/${bannerType}/count`, {
          params: this.buildParams(undefined, filters),
        })
      )
    );
  }

  getItems(): Observable<Item[]> {
    return this._http.get<Item[]>('/api/items');
  }

  getCharacterEvents(): Observable<Event[]> {
    return this._http.get<Event[]>('/api/events/character');
  }

  getWeaponEvents(): Observable<Event[]> {
    return this._http.get<Event[]>('/api/events/weapon');
  }

  getLatestEvent(): Observable<{ [key: number]: Event }> {
    return this._http.get<{ [key: number]: Event }>('/api/events/latest');
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

        const errorKey = this.getTranslationKeyFromError(error.error);

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

  private getTranslationKeyFromError(error: string): string {
    switch (error) {
      case ApiErrors.AUTHKEY_INVALID:
        return 'wishes.import.invalidAuthkey$';
      case ApiErrors.MIHOYO_UNREACHABLE:
        return 'generics.mihoyoError$';
      case ApiErrors.NEW_WISHES_DURING_IMPORT:
        return 'wishes.import.newWishesDuringImport$';
      default:
        return 'generics.error$';
    }
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

  private buildParams(page?: number, filters?: WishFilters): Params {
    const params: Params = {};

    if (page !== undefined) params.page = page + '';

    if (filters !== undefined) filters.addToParams(params);

    if (this._lang.getCurrentLang() === 'fr') params.fr = 'true';

    return params;
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
