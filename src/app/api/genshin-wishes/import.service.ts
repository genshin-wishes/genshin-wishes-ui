import { Injectable } from '@angular/core';
import { from, interval, Observable, of, Subject } from 'rxjs';
import { ImportResponse } from './import-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiErrors, BannerTypes } from './constants';
import { DifferentUidDialogComponent } from '../../auth/different-uid-dialog/different-uid-dialog.component';
import {
  catchError,
  exhaustMap,
  finalize,
  map,
  shareReplay,
  startWith,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MihoyoService } from '../mihoyo/mihoyo.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackService } from '../../shared/snack/snack.service';
import { User } from './user';
import { GenshinWishesService } from './genshin-wishes.service';
import { AuthService } from '../../auth/auth.service';

function getTranslationKeyFromError(
  error: string
): { key: string; retry: boolean } {
  switch (error) {
    case ApiErrors.AUTHKEY_INVALID:
      return { key: 'wishes.import.invalidAuthkey$', retry: true };
    case ApiErrors.MIHOYO_UNREACHABLE:
      return { key: 'generics.mihoyoError$', retry: true };
    case ApiErrors.NEW_WISHES_DURING_IMPORT:
      return { key: 'wishes.import.newWishesDuringImport$', retry: true };
    case ApiErrors.ALREADY_IMPORTING:
      return { key: 'wishes.import.alreadyImporting$', retry: false };
    default:
      return { key: 'generics.error$', retry: true };
  }
}

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  private _scanStates$ = new Subject<{
    scan: boolean;
    state: ImportResponse | null;
    setup: boolean;
    start?: boolean;
  }>();

  private _bannerCount: ImportResponse = {} as ImportResponse;
  private _hadWishes = false;

  importState$: Observable<ImportResponse | null> = this._scanStates$.pipe(
    startWith({ scan: true, state: null, setup: false, start: true }),
    tap((scan) => {
      if (scan.scan) {
        this._bannerCount = {} as ImportResponse;
        this._hadWishes = false;
      }
    }),
    exhaustMap((scan) =>
      !scan.scan
        ? of(scan.state)
        : interval(500).pipe(
            exhaustMap(() =>
              this._http.get<ImportResponse>('/api/wishes/importState')
            ),
            catchError((err) => {
              this._snack
                .open(
                  'generics.error$',
                  'import_error_state',
                  'accent',
                  'generics.retry'
                )
                .onAction()
                .subscribe(() => this.import());

              throw err;
            }),
            map((res: ImportResponse | null) => {
              if (!res) return null;

              if (scan.start) {
                this._snack.open('wishes.import.recovery$', 'import_f5');
                scan.start = false;
              }

              if (!this._bannerCount && !!res) this._bannerCount = res;

              // merge only existing rows
              BannerTypes.forEach(
                (b) => res[b] && (this._bannerCount[b] = res[b])
              );

              this._hadWishes =
                this._hadWishes ||
                (!!this._bannerCount &&
                  !!BannerTypes.find(
                    (b) => this._bannerCount[b] && this._bannerCount[b].count
                  ));

              return this._bannerCount;
            }),
            takeWhile(
              (res) =>
                !!res &&
                !!BannerTypes.find(
                  (b) => !this._bannerCount[b] || !this._bannerCount[b].saved
                )
            ),
            finalize(() => {
              this._scanStates$.next({
                scan: false,
                state: null,
                setup: scan.setup,
              });
              this._http.delete('/api/wishes/importState').toPromise();

              if (!scan.setup) {
                if (this._hadWishes) {
                  this._snack.openMulti(
                    BannerTypes.filter(
                      (banner) => this._bannerCount[banner].count > 0
                    ).map((banner) => ({
                      message: this._translate.instant(
                        'wishes.import.success$.message',
                        {
                          wishes: this._bannerCount[banner].count,
                          banner: this._translate.instant(
                            'wishes.banners$.' + banner + '.title'
                          ),
                        }
                      ),
                    })),
                    'import_success',
                    'wishes.import.success$.emoji'
                  );

                  this._gw.updateWishes();
                } else if (
                  Object.getOwnPropertyNames(this._bannerCount).length
                ) {
                  this._snack
                    .open(
                      'wishes.import.noData$',
                      'import_no_new_wishes',
                      'accent',
                      'generics.retry'
                    )
                    .onAction()
                    .subscribe(() => this.import());
                }
              }
            }),
            startWith({} as ImportResponse)
          )
    ),
    shareReplay(1)
  );

  constructor(
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _mihoyo: MihoyoService,
    private _translate: TranslateService,
    private _auth: AuthService,
    private _snack: SnackService,
    private _gw: GenshinWishesService
  ) {}

  import(setup: boolean = false): Promise<void> {
    let usedAuthKey: string | null = null;

    this._scanStates$.next({ scan: false, state: {} as ImportResponse, setup });

    return this._mihoyo
      .getAuthkey()
      .then((authKey) => {
        usedAuthKey = authKey;

        return this._http
          .get<void>('/api/wishes/import', {
            params: {
              authkey: authKey,
            },
          })
          .toPromise();
      })
      .then(() =>
        this._scanStates$.next({
          scan: true,
          state: {} as ImportResponse,
          setup,
        })
      )
      .catch((error: HttpErrorResponse) => {
        if (error && error.error === ApiErrors.ALREADY_IMPORTING) {
          return Promise.resolve();
        }

        this._scanStates$.next({ scan: false, state: null, setup });

        if (!error) {
          return Promise.reject();
        }

        if (error.error === ApiErrors.AUTHKEY_INVALID) {
          this._mihoyo.invalidateKey();
        } else if (error.error === ApiErrors.MIHOYO_UID_DIFFERENT) {
          return this._dialog
            .open(DifferentUidDialogComponent)
            .afterClosed()
            .toPromise()
            .then((res) => {
              // tslint:disable-next-line:no-non-null-assertion
              if (!!res) return this.deleteAndImport(usedAuthKey!);

              return Promise.reject();
            });
        }

        const errorInfo = getTranslationKeyFromError(error.error);

        if (!setup) {
          const snack = this._snack.open(
            errorInfo.key,
            'import_error_' + error.error,
            'accent',
            errorInfo.retry ? 'generics.retry' : undefined
          );

          if (errorInfo.retry)
            return snack
              .onAction()
              .pipe(exhaustMap(() => from(this.import(setup))))
              .toPromise();
        }

        return Promise.reject();
      });
  }

  private deleteAndImport(authkey: string): Promise<void> {
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
      .then(() => this.import())
      .then(() => {
        window.location.reload();
      });
  }
}
