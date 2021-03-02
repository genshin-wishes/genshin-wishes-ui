import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  first,
  map,
  shareReplay,
  startWith,
  switchMap,
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
  WishFiltersComponent,
  WishFiltersDialogData,
} from './wish-filters/wish-filters.component';
import { LangService } from '../shared/lang.service';
import { MatDialog } from '@angular/material/dialog';
import { VirtualScrollDatasource } from './virtual-scroll-datasource';
import { WishFilters } from './wish-filters/wish-filters';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss'],
})
export class WishesComponent implements OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  private destroy = new Subject();

  filters$ = new BehaviorSubject<WishFilters>(new WishFilters());

  bannerType$ = this.route.params.pipe(
    map((params) => params.banner.replace('-', '_').toUpperCase()),
    tap(() => {
      this.initialFilters = new WishFilters();

      this.filters$.next(this.initialFilters);
    }),
    shareReplay(1)
  );

  count$ = combineLatest([this.bannerType$, this.filters$]).pipe(
    tap(() => {
      this._lastCount = undefined;
      this._datasource && this._datasource.reset();
    }),
    switchMap(([bannerType, filters]) =>
      this._gw.countWishes(bannerType, filters).pipe(
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

          if (this._lastCount && this._datasource != undefined) {
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

  initialFilters: WishFilters = new WishFilters();

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
    public readonly route: ActivatedRoute,
    private _translate: TranslateService,
    private _top: TopService,
    private _lang: LangService,
    private _gw: GenshinWishesService,
    private _mediaObserver: MediaObserver,
    private _dialog: MatDialog
  ) {
    this.route.queryParams.subscribe((params) => {
      this.initialFilters = new WishFilters(params);

      this.filters$.next(this.initialFilters);
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
        route: this.route,
        filters: this.filters$.value,
        filtersChange: this.filters$,
      } as WishFiltersDialogData,
    });
  }

  private fetchPage(page: number): Observable<Wish[]> {
    return this.bannerType$.pipe(
      first(),
      switchMap((bannerType) =>
        this._gw.getWishes(bannerType, page, this.filters$.value)
      )
    );
  }
}
