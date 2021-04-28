import { Component } from '@angular/core';
import { StatsService } from './stats.service';
import { WishFilters } from '../wishes/wish-filters/wish-filters';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  finalize,
  first,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { TopService } from '../../core/top.service';
import { ActivatedRoute } from '@angular/router';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';
import {
  BannerToId,
  BannerType,
  IdToBanner,
} from '../../api/genshin-wishes/constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  statsEndpoint$: Observable<string> = this._route.data.pipe(
    map((data) => data.statsEndpoint),
    shareReplay(1)
  );
  profileMode$: Observable<boolean> = this._route.data.pipe(
    map((data) => data.profileMode),
    shareReplay(1)
  );

  filters$ = new BehaviorSubject<WishFilters>(new WishFilters());
  loading$ = new BehaviorSubject(true);

  ALL = BannerType.ALL;

  banner$ = this._route.params.pipe(
    map((params) => params.banner + ''),
    map(
      (banner) => IdToBanner[BannerToId[banner.toUpperCase().replace('-', '_')]]
    ),
    tap(() => this.resetFilters()),
    shareReplay(1)
  );

  stats$ = combineLatest([
    this.banner$,
    this.filters$,
    this.statsEndpoint$,
  ]).pipe(
    tap(() => this.loading$.next(true)),
    debounceTime(150),
    switchMap(([banner, filters, statsEndpoint]) =>
      this._gw.getStats(banner, statsEndpoint, filters)
    ),
    tap(() => this.loading$.next(false)),
    finalize(() => this.loading$.next(false)),
    shareReplay(1)
  );

  rankDistribution$ = this._stats.getRankDistribution(this.stats$);
  focusDistribution5Stars$ = this._stats.getFocusDistribution(this.stats$, 5);
  focusDistribution4Stars$ = this._stats.getFocusDistribution(this.stats$, 4);
  fourStarsDetails$ = this._stats.getFourStarsDetails(this.stats$);
  fiveStarsList$ = this._stats.getFiveStarsList(this.stats$);
  fourStarsList$ = this._stats.getFourStarsList(this.stats$);
  bannerActivity$ = this._stats.getBannerActivity(this.stats$);

  characterEvents$ = this._gw.getStatsCharacterEvents(this.statsEndpoint$);
  weaponEvents$ = this._gw.getStatsWeaponEvents(this.statsEndpoint$);

  BannerType = BannerType;

  constructor(
    private _route: ActivatedRoute,
    private _gw: GenshinWishesService,
    private _stats: StatsService,
    private _top: TopService
  ) {
    this.profileMode$
      .pipe(first())
      .subscribe(
        (profileMode) => !profileMode && this._top.setTitle('stats.label')
      );
  }

  resetFilters(): void {
    this.filters$.next(new WishFilters());
  }
}
