import { Component } from '@angular/core';
import { PublicStatsService } from './public-stats.service';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';
import { BannerToId, BannerType } from '../api/genshin-wishes/constants';
import { finalize, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import * as Flickity from 'flickity';
import { combineLatest, Subject } from 'rxjs';
import { CountPerItemId, PublicStats } from './public-stats';
import { Banner } from '../api/banner';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface PublicStatsData {
  loading: boolean;
  banner: BannerType;
  events: Banner[];
  event: Banner;
  stats: PublicStats;
  latestEventsCounts: {
    event: Banner;
    count: number;
    itemIdToCount: CountPerItemId[];
  }[];
  usersPerRegion: { labels: Label[]; datasets: ChartDataSets[] };
  wishesPerRegion: { labels: Label[]; datasets: ChartDataSets[] };
  pityDistribution5Stars: { labels: Label[]; datasets: ChartDataSets[] };
  pityDistribution4Stars: { labels: Label[]; datasets: ChartDataSets[] };
  bannerActivity: { labels: Label[]; datasets: ChartDataSets[] };
  countPerBanner: { labels: Label[]; datasets: ChartDataSets[] };
  countPerRank: { labels: Label[]; datasets: ChartDataSets[] };
}

@Component({
  selector: 'app-public-stats',
  templateUrl: './public-stats.component.html',
  styleUrls: ['./public-stats.component.scss'],
})
export class PublicStatsComponent {
  banner$ = this._route.params.pipe(
    map((params) =>
      !params.banner ? '' : params.banner.toUpperCase().replace('-', '_')
    )
  );
  eventId$ = this._route.queryParams.pipe(
    map((params) =>
      params.event !== null && params.event !== undefined
        ? +params.event
        : params.event
    )
  );

  loading$ = new Subject<boolean>();

  stats$ = combineLatest([this.banner$, this.eventId$]).pipe(
    tap(() => this.loading$.next(true)),
    switchMap(([banner, eventId]) =>
      this._stats.getPublicStats(banner, eventId)
    ),
    tap(() => this.loading$.next(false)),
    finalize(() => this.loading$.next(false)),
    shareReplay(1)
  );

  characterEvents$ = this._gw.getCharacterEvents();
  weaponEvents$ = this._gw.getWeaponEvents();
  latestEvents$ = this._gw.getLatestEvent();
  usersPerRegion$ = this._stats.getUsersPerRegion(this.stats$);
  wishesPerRegion$ = this._stats.getWishesPerRegion(this.stats$);
  pityDistribution5Stars$ = this._stats.getPityDistribution(5, this.stats$);
  pityDistribution4Stars$ = this._stats.getPityDistribution(4, this.stats$);
  bannerActivity$ = this._stats.getPublicBannerActivity(this.stats$);
  countPerBanner$ = this._stats.getCountPerBanner(this.stats$);
  countPerRank$ = this._stats.getCountPerRank(this.stats$);
  latestEventsCounts$ = this._stats.getLatestEventsCounts(this.stats$);

  data$ = combineLatest([
    this.loading$,
    this.banner$,
    this.characterEvents$,
    this.weaponEvents$,
    this.latestEvents$,
    this.eventId$,
    this.stats$,
    this.latestEventsCounts$,
    this.usersPerRegion$,
    this.wishesPerRegion$,
    this.pityDistribution5Stars$,
    this.pityDistribution4Stars$,
    this.bannerActivity$,
    this.countPerBanner$,
    this.countPerRank$,
  ]).pipe(
    map(
      ([
        loading,
        banner,
        characterEvents,
        weaponEvents,
        latestEvents,
        eventId,
        stats,
        latestEventsCounts,
        usersPerRegion,
        wishesPerRegion,
        pityDistribution5Stars,
        pityDistribution4Stars,
        bannerActivity,
        countPerBanner,
        countPerRank,
      ]) =>
        ({
          loading,
          banner,
          events:
            banner === BannerType.CHARACTER_EVENT
              ? characterEvents
              : weaponEvents,
          event:
            (eventId !== null &&
              eventId !== undefined &&
              ((banner === BannerType.CHARACTER_EVENT
                ? characterEvents
                : weaponEvents) as Banner[]).find((b) => b.id === eventId)) ||
            ((banner === BannerType.PERMANENT ||
              banner === BannerType.NOVICE) &&
              latestEvents[BannerToId[banner]]),
          stats,
          latestEventsCounts,
          usersPerRegion,
          wishesPerRegion,
          pityDistribution5Stars,
          pityDistribution4Stars,
          bannerActivity,
          countPerBanner,
          countPerRank,
        } as PublicStatsData)
    ),
    tap(() => {
      setTimeout(() => {
        const classes = ['.items-lists'];

        classes.forEach((css) => {
          const flickity = new Flickity(css, {
            prevNextButtons: false,
            percentPosition: true,
            groupCells: true,
            draggable: true,
            cellAlign: 'left',
            contain: false,
            pageDots: false,
          });

          flickity.on('dragStart', () =>
            flickity.slider.childNodes.forEach(
              (slide) =>
                (((slide as unknown) as {
                  style: { pointerEvents: string };
                }).style.pointerEvents = 'none')
            )
          );
          flickity.on('dragEnd', () =>
            flickity.slider.childNodes.forEach(
              (slide) =>
                (((slide as unknown) as {
                  style: { pointerEvents: string };
                }).style.pointerEvents = 'all')
            )
          );
        });
      }, 0);
    })
  );

  BannerType = BannerType;
  BannerToId = BannerToId;

  minutes = environment.globalStats.refreshRate;

  constructor(
    private _route: ActivatedRoute,
    private _gw: GenshinWishesService,
    private _stats: PublicStatsService,
    private _router: Router
  ) {}

  goToEvent(event: number[]): void {
    const queryParams = {
      event: event[0],
    };
    this._router.navigate(['.'], {
      queryParams: event?.length ? queryParams : {},
      relativeTo: this._route,
    });
  }
}
