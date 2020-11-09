import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  first,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';
import { MediaObserver } from '@angular/flex-layout';
import { VirtualScrollDatasource } from './virtual-scroll-datasource';
import { Wish } from '../api/genshin-wishes/wish';
import { TopService } from '../shared/layout/top.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss'],
})
export class WishesComponent implements OnDestroy {
  private destroy = new Subject();

  count$ = this.getBannerType().pipe(
    tap((bannerType) => {
      this._lastCount = undefined;
      this.currentPage = 0;
      this._datasource && this._datasource.reset();
    }),
    switchMap((bannerType) =>
      this._gw.countWishes(bannerType).pipe(
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

  itemSize$ = this._mediaObserver
    .asObservable()
    .pipe(map(() => (this._mediaObserver.isActive('lt-sm') ? 76 : 65)));

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

  private _lastCount: number | undefined;
  private _datasource: VirtualScrollDatasource<Wish> | undefined;
  currentPage = 0;

  constructor(
    private _route: ActivatedRoute,
    private _translate: TranslateService,
    private _top: TopService,
    private _gw: GenshinWishesService,
    private _mediaObserver: MediaObserver
  ) {}

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private fetchPage(page: number) {
    return this.getBannerType().pipe(
      first(),
      switchMap((bannerType) => this._gw.getWishes(bannerType, page))
    );
  }

  private getBannerType() {
    return this._route.params.pipe(
      map((params) => params.banner.replace('-', '_').toUpperCase())
    );
  }
}
