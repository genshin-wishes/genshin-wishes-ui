import { Component } from '@angular/core';
import { StatsService } from './stats.service';
import { WishFilters } from '../wishes/wish-filters/wish-filters';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  debounceTime,
  finalize,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { TopService } from '../shared/layout/top.service';
import { ActivatedRoute } from '@angular/router';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';
import {
  BannerToId,
  BannerType,
  IdToBanner,
} from '../api/genshin-wishes/constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
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

  stats$ = combineLatest([this.banner$, this.filters$]).pipe(
    tap(() => this.loading$.next(true)),
    debounceTime(150),
    switchMap(([banner, filters]) => this._stats.getStats(banner, filters)),
    tap(() => this.loading$.next(false)),
    finalize(() => this.loading$.next(false)),
    shareReplay(1)
  );

  rankDistribution$ = this._stats.getRankDistribution(this.stats$);
  focusDistribution$ = this._stats.getFocusDistribution(this.stats$);
  fourStarsDetails$ = this._stats.getFourStarsDetails(this.stats$);
  fiveStarsList$ = this._stats.getFiveStarsList(this.stats$);
  fourStarsList$ = this._stats.getFourStarsList(this.stats$);
  bannerActivity$ = this._stats.getBannerActivity(this.stats$);

  characterEvents$ = this._gw.getCharacterEvents();
  weaponEvents$ = this._gw.getWeaponEvents();

  BannerType = BannerType;

  constructor(
    private _route: ActivatedRoute,
    private _gw: GenshinWishesService,
    private _stats: StatsService,
    private _top: TopService
  ) {
    this._top.setTitle('stats.label');
  }

  resetFilters(): void {
    this.filters$.next(new WishFilters());
  }
}
