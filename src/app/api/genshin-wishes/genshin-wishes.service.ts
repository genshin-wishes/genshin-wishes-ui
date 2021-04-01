import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  Subject,
} from 'rxjs';
import { User } from './user';
import { MihoyoService } from '../mihoyo/mihoyo.service';
import { BannerData } from './banner';
import { Wish } from './wish';
import { exhaustMap, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SnackService } from '../../shared/snack/snack.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../auth/auth.service';
import { Params } from '@angular/router';
import { WishFilters } from '../../gw-app/wishes/wish-filters/wish-filters';
import { Lang, LangService } from '../../shared/lang.service';
import { Item } from '../item';
import { Banner } from '../banner';
import {
  ApiErrors,
  BannerToId,
  BannerType,
  BannerTypes,
  PITY_4,
  PITY_5_BY_TYPE,
} from './constants';
import { Stats } from './stats';
import { ItemNamePipe } from '../../shared/item-name.pipe';

@Injectable({
  providedIn: 'root',
})
export class GenshinWishesService {
  private items$ = new BehaviorSubject<Item[]>([]);

  private _updateWishes = new Subject();
  readonly onWishesUpdate$ = this._updateWishes.asObservable();

  constructor(
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _mihoyo: MihoyoService,
    private _auth: AuthService,
    private _translate: TranslateService,
    private _snack: SnackService,
    private _itemName: ItemNamePipe,
    private _lang: LangService
  ) {
    this._http.get<Item[]>('/api/items').subscribe((i) => this.items$.next(i));
  }

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

  getBannersData(): Observable<BannerData[]> {
    return this.onWishesUpdate$.pipe(
      startWith(null),
      switchMap(() =>
        combineLatest([
          this.items$,
          this._http.get<Record<BannerType, Wish[]>>('/api/wishes/banners'),
        ]).pipe(
          map(([items, records]) =>
            BannerTypes.map((type) => {
              if (!records[type]) {
                return {
                  key: type,
                  title: 'wishes.banners$.' + type + '.title',
                  pity5: PITY_5_BY_TYPE[type],
                  pity4: PITY_4,
                } as BannerData;
              }

              records[type] = records[type].map((wish) => ({
                ...wish,
                item: wish.itemId
                  ? items.find((i) => i.itemId === wish.itemId)
                  : undefined,
              }));

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
              } as BannerData;
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
    return combineLatest([
      this.items$,
      this._http.get<Wish[]>(`/api/wishes/${banner}`, {
        params: this.buildParams(page, filters),
      }),
    ]).pipe(
      map(([items, wishes]) =>
        wishes.map((wish) => ({
          ...wish,
          item: wish.itemId
            ? items.find((i) => i.itemId === wish.itemId)
            : undefined,
          time: new Date(wish.time),
        }))
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
    return this.items$;
  }

  getCharacterEvents(): Observable<Banner[]> {
    return this._http.get<Banner[]>('/api/banners/character');
  }

  getWeaponEvents(): Observable<Banner[]> {
    return this._http.get<Banner[]>('/api/banners/weapon');
  }

  getStatsCharacterEvents(endpoint$: Observable<string>): Observable<Banner[]> {
    return endpoint$.pipe(
      exhaustMap((endpoint) =>
        this._http.get<Banner[]>(endpoint + '/banners/character')
      )
    );
  }

  getStatsWeaponEvents(endpoint$: Observable<string>): Observable<Banner[]> {
    return endpoint$.pipe(
      exhaustMap((endpoint) =>
        this._http.get<Banner[]>(endpoint + '/banners/weapon')
      )
    );
  }

  getLatestEvent(): Observable<{ [key: number]: Banner }> {
    return this._http.get<{ [key: number]: Banner }>('/api/banners/latest');
  }

  updateLang(lang: Lang): Promise<void> {
    return this.callWithRetry(
      () =>
        this._http.patch<void>(`/api/user/lang`, undefined, {
          params: {
            lang,
          },
        }),
      {
        success: 'settings.lang.success$',
        gaSuccess: 'settings_lang_success',
        gaError: 'settings_lang_error',
      }
    );
  }

  updateTimeFormat(wholeClock: boolean): Promise<void> {
    return this.callWithRetry(
      () =>
        this._http.patch<void>(`/api/user/wholeClock`, undefined, {
          params: {
            wholeClock: wholeClock + '',
          },
        }),
      {
        success: 'settings.wholeClock.success$',
        gaSuccess: 'settings_wholeClock_success',
        gaError: 'settings_wholeClock_error',
      }
    );
  }

  getStats(
    banner: BannerType,
    endpoint: string,
    filters: WishFilters
  ): Observable<Stats> {
    return this.onWishesUpdate$.pipe(
      startWith(null),
      switchMap(() =>
        combineLatest([
          this.items$,
          this._http.get<Banner[]>(endpoint + '/banners'),
          this._http.get<Stats>(endpoint + `/stats/${banner}`, {
            params: this.buildParams(undefined, filters),
          }),
        ]).pipe(
          map(([items, banners, stats]) => {
            const updatedStats: Stats = {
              ...stats,
              wishes: stats.wishes.map((w) => ({
                ...w,
                item: w.itemId
                  ? items.find((i) => i.itemId === w.itemId)
                  : undefined,
                banner: banners.find(
                  (b) =>
                    BannerToId[b.gachaType] === w.gachaType &&
                    ((!b.start && !b.end) ||
                      (b.start <= w.time && w.time) <= b.end)
                ),
              })),
            };

            updatedStats.gap4Stars = this.calculateGapFor(
              updatedStats.wishes,
              4
            );
            updatedStats.gap5Stars = this.calculateGapFor(
              updatedStats.wishes,
              5
            );

            return updatedStats;
          })
        )
      )
    );
  }

  updateWishes(): void {
    this._updateWishes.next();
  }

  private callWithRetry(
    fn: () => Observable<void>,
    keys: {
      success: string;
      gaSuccess: string;
      gaError: string;
    }
  ): Promise<void> {
    return fn()
      .toPromise()
      .then(() => {
        this._snack.open(keys.success, keys.gaSuccess);
      })
      .catch((error) => {
        if (!error) {
          return Promise.reject();
        }

        return this._snack
          .open('generics.error$', keys.gaError, 'accent', 'generics.retry')
          .onAction()
          .pipe(exhaustMap(() => this.callWithRetry(fn, keys)))
          .toPromise();
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

  private calculateGapFor(
    wishes: (Wish & { pity: number })[],
    rankType: 4 | 5
  ): number {
    const wishesOfRank = wishes.filter((w) => w.item?.rankType === rankType);

    return (
      wishesOfRank.reduce((total, w) => total + w.pity, 0) / wishesOfRank.length
    );
  }

  private buildParams(page?: number, filters?: WishFilters): Params {
    const params: Params = {};

    if (page !== undefined) params.page = page + '';

    if (filters !== undefined) {
      filters.addToQueryParams(
        this.items$.value.map((i) => ({
          ...i,
          name: this._itemName.transform(i),
        })),
        params
      );
    }

    return params;
  }
}
