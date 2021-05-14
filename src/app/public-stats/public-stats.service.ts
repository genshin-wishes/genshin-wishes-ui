import { Injectable } from '@angular/core';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';
import { combineLatest, Observable, of } from 'rxjs';
import { CountPerItemId, EventStats, PublicStats } from './public-stats';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { map, switchMap } from 'rxjs/operators';
import { ColorsUtils } from '../shared/colors.utils';
import {
  BannerToId,
  BannerType,
  BannerTypes,
} from '../api/genshin-wishes/constants';
import { TranslateService } from '@ngx-translate/core';
import { Banner } from '../api/banner';

@Injectable({
  providedIn: 'root',
})
export class PublicStatsService {
  constructor(
    private _gw: GenshinWishesService,
    private _translate: TranslateService
  ) {}

  getPublicStats(
    banner: BannerType,
    eventId?: number
  ): Observable<PublicStats> {
    return combineLatest([
      this._gw.getItems(),
      this._gw.getPublicStats(banner, eventId),
    ]).pipe(
      map(([items, stats]) => ({
        ...stats,
        countPerItemId: stats.countPerItemId.map((count) => ({
          ...count,
          item: count.itemId
            ? items.find((i) => i.itemId === count.itemId)
            : undefined,
        })),
      }))
    );
  }

  getPublicBannerActivity(
    publicStats$: Observable<PublicStats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return publicStats$.pipe(
      map((stats) => {
        const countsPerDay = stats.countPerDay;
        countsPerDay.sort((d1, d2) => d2.date.localeCompare(d1.date));

        const labels = countsPerDay
          .filter(
            (c, i) => countsPerDay.findIndex((c2) => c2.date === c.date) === i
          )
          .map((c) => c.date);

        return {
          labels,
          datasets: [
            {
              label: 'wishes',
              pointHitRadius: 15,
              pointStyle: 'circle',
              pointBorderWidth: 0,
              pointRadius: 1,
              borderWidth: 1,
              ...ColorsUtils.getColorsFor([3], false, 0),
              data: labels.map(
                (date) =>
                  countsPerDay.find((c2) => c2.date === date)?.count || 0
              ),
            },
          ],
        };
      })
    );
  }

  getPityDistribution(
    rankType: 5 | 4,
    publicStats$: Observable<PublicStats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return publicStats$.pipe(
      switchMap((stats) => {
        if (!stats.countPerPity5Stars && !stats.countPerPity4Stars)
          return of({
            labels: [],
            datasets: [],
          });

        const countsPerPity =
          rankType === 5 ? stats.countPerPity5Stars : stats.countPerPity4Stars;

        const labels = countsPerPity
          .filter(
            (c, i) => countsPerPity.findIndex((c2) => c2.pity === c.pity) === i
          )
          .map((c) => c.pity + '');

        labels.sort((a, b) => +a - +b);

        return of({
          labels,
          datasets: [
            {
              label: this._translate.instant('wishes.label'),
              barThickness: 3,
              borderWidth: 1,
              ...ColorsUtils.getColorsFor([rankType], false, 0),
              data: labels.map(
                (pity) =>
                  countsPerPity.find((c2) => c2.pity === +pity)?.count || 0
              ),
            },
          ],
        });
      })
    );
  }

  getCountPerBanner(
    stats$: Observable<PublicStats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
      map((stats) => {
        if (!stats.countPerBanner?.length) return { labels: [], datasets: [] };

        const countPerBanner: Record<number, number> = {} as Record<
          number,
          number
        >;

        stats.countPerBanner.forEach((count) => {
          countPerBanner[count.gachaType] =
            (countPerBanner[count.gachaType] || 0) + count.count;
        });

        return {
          labels: BannerTypes.map((b) =>
            this._translate.instant('wishes.banners$.' + b + '.title')
          ),
          datasets: [
            {
              label: this._translate.instant('wishes.label'),
              pointHitRadius: 15,
              pointStyle: 'circle',
              pointBorderWidth: 0,
              pointRadius: 1,
              borderWidth: 1,
              ...ColorsUtils.getColorsFor([5, 4, 3, 2]),
              data: BannerTypes.map((b) => countPerBanner[BannerToId[b]]),
            },
          ],
        };
      })
    );
  }

  getCountPerRank(
    stats$: Observable<PublicStats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
      map((stats) => {
        return {
          labels: ['★★★', '★★★★', '★★★★★'],
          datasets: [
            {
              label: this._translate.instant('wishes.label'),
              pointHitRadius: 15,
              pointStyle: 'circle',
              pointBorderWidth: 0,
              pointRadius: 1,
              borderWidth: 1,
              ...ColorsUtils.getColorsFor([3, 4, 5]),
              data: [
                stats.count - stats.count5Stars - stats.count4Stars,
                stats.count4Stars,
                stats.count5Stars,
              ],
            },
          ],
        };
      })
    );
  }

  getWishesPerRegion(
    stats$: Observable<PublicStats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
      map((stats) => {
        const countPerRegion: Record<string, number> = {} as Record<
          string,
          number
        >;

        stats.countPerRegion.forEach((count) => {
          countPerRegion[count.region] =
            (countPerRegion[count.region] || 0) + count.count;
        });

        return {
          labels: Object.getOwnPropertyNames(countPerRegion).map((region) =>
            this._translate.instant('generics.region$.' + region)
          ),
          datasets: [
            {
              label: 'wishes',
              pointHitRadius: 15,
              pointStyle: 'circle',
              pointBorderWidth: 0,
              pointRadius: 1,
              borderWidth: 1,
              ...ColorsUtils.getColorsFor([5, 4, 3, 3]),
              data: Object.getOwnPropertyNames(countPerRegion).map(
                (region) => countPerRegion[region]
              ),
            },
          ],
        };
      })
    );
  }

  getUsersPerRegion(
    stats$: Observable<PublicStats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
      map((stats) => {
        const usersPerRegion: Record<string, number> = {} as Record<
          string,
          number
        >;

        stats.usersPerRegion = stats.usersPerRegion.sort(
          (a, b) => b.count - a.count
        );

        stats.usersPerRegion.forEach((count) => {
          usersPerRegion[count.region] =
            (usersPerRegion[count.region] || 0) + count.count;
        });

        const sortedRegions = Object.getOwnPropertyNames(usersPerRegion).sort(
          (a, b) => usersPerRegion[b] - usersPerRegion[a]
        );
        return {
          labels: sortedRegions.map((region) =>
            this._translate.instant('generics.region$.' + region)
          ),
          datasets: [
            {
              label: 'users',
              pointHitRadius: 15,
              pointStyle: 'circle',
              pointBorderWidth: 0,
              pointRadius: 1,
              borderWidth: 1,
              ...ColorsUtils.getColorsFor([5, 4, 3, 3]),
              data: sortedRegions.map((region) => usersPerRegion[region]),
            },
          ],
        };
      })
    );
  }

  getLatestEventsCounts(
    stats$: Observable<PublicStats>
  ): Observable<{
    [key: number]: EventStats;
  }> {
    return combineLatest([this._gw.getLatestEvent(), stats$]).pipe(
      map(
        ([latestEvents, stats]) =>
          stats.latestEventsCounts &&
          Object.getOwnPropertyNames(stats.latestEventsCounts).reduce(
            (total, bannerType) => {
              total[BannerToId[bannerType]] = {
                event: latestEvents[BannerToId[bannerType]],
                count: stats.latestEventsCounts[bannerType].count,
                itemIdToCount: stats.latestEventsCounts[bannerType].items,
              };

              return total;
            },
            {} as {
              [key: number]: EventStats;
            }
          )
      )
    );
  }
}
