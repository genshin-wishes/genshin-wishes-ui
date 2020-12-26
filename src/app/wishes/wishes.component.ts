import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  first,
  map,
  shareReplay,
  skip,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';
import { MediaObserver } from '@angular/flex-layout';
import { Wish } from '../api/genshin-wishes/wish';
import { TopService } from '../shared/layout/top.service';
import { TranslateService } from '@ngx-translate/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  WishFilters,
  WishFiltersComponent,
  WishFiltersDialogData,
} from './wish-filters/wish-filters.component';
import { LangService } from '../shared/lang.service';
import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';
import { VirtualScrollDatasource } from './virtual-scroll-datasource';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss'],
})
export class WishesComponent implements OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  private destroy = new Subject();

  filters$ = new BehaviorSubject<WishFilters>({
    ranks: [],
  });

  count$ = combineLatest([
    this.getBannerType(),
    this.filters$.pipe(debounceTime(300)),
  ]).pipe(
    tap(() => {
      this._lastCount = undefined;
      this._datasource && this._datasource.reset();
    }),
    switchMap(([bannerType, filters]) =>
      this._gw
        .countWishes(bannerType, {
          ...filters,
          fr: this._lang.getCurrentLang() === 'fr',
        })
        .pipe(
          tap((count) => {
            this._top.setTitle(
              count > 0
                ? this._translate.instant(
                    'wishes.banners$.' + bannerType + '.titleWithCount',
                    { wishes: count }
                  )
                : 'wishes.banners$.' + bannerType + '.title',
              'wishes.banners$.' + bannerType + '.title'
            );

            if (this._lastCount) {
              this._datasource != undefined &&
                this._lastCount != undefined &&
                this._datasource.insertNew(count - this._lastCount);
            } else if (this._datasource) {
              this._datasource.update(count);
            }

            this._lastCount = count;
          }),
          startWith(undefined)
        )
    ),
    shareReplay(1)
  );

  private _lastCount: number | undefined;

  initialFilters: WishFilters = {
    ranks: [],
  };

  private _datasource: VirtualScrollDatasource<Wish> | undefined;

  wishes$ = this.count$.pipe(
    first(),
    map(
      (count) =>
        (this._datasource = new VirtualScrollDatasource(
          count || 0,
          10,
          this.fetchPage.bind(this)
        ))
    )
  );

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _translate: TranslateService,
    private _top: TopService,
    private _lang: LangService,
    private _gw: GenshinWishesService,
    private _mediaObserver: MediaObserver,
    private _dialog: MatDialog
  ) {
    this._route.queryParams.pipe(first()).subscribe((params) => {
      let skipCount = 0;
      if (
        params.freeText !== undefined ||
        params.rank !== undefined ||
        params.itemType !== undefined ||
        params.startDate !== undefined ||
        params.endDate !== undefined
      ) {
        skipCount = 1;
        this.initialFilters = {
          freeText: params.freeText,
          ranks: []
            .concat(params.rank ? params.rank : [])
            .map((one: string) => +one),
          itemType: params.itemType,
          startDate: params.startDate && moment(params.startDate, 'L'),
          endDate: params.endDate && moment(params.endDate, 'L'),
        };
        this.filters$.next(this.initialFilters);
      }

      this.filters$
        .asObservable()
        .pipe(skip(skipCount), takeUntil(this.destroy))
        .subscribe((filters) => {
          this._router.navigate(['.'], {
            queryParams: {
              freeText: filters.freeText,
              rank: filters.ranks.length ? filters.ranks : undefined,
              itemType: filters.itemType,
              startDate: filters.startDate?.format('L'),
              endDate: filters.endDate?.format('L'),
            },
            relativeTo: this._route,
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  openFilters(): void {
    this._dialog.open(WishFiltersComponent, {
      width: '400px',
      data: {
        filters: this.filters$.value,
        filtersChange: this.filters$,
      } as WishFiltersDialogData,
    });
  }

  private getBannerType(): Observable<string> {
    return this._route.params.pipe(
      map((params) => params.banner.replace('-', '_').toUpperCase())
    );
  }

  private fetchPage(page: number): Observable<Wish[]> {
    return this.getBannerType().pipe(
      first(),
      switchMap((bannerType) =>
        this._gw.getWishes(bannerType, page, {
          ...this.filters$.value,
          fr: this._lang.getCurrentLang() === 'fr',
        })
      )
    );
  }
}
