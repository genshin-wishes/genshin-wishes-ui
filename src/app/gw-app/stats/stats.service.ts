import { Injectable } from '@angular/core';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';
import { Stats } from '../../api/genshin-wishes/stats';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { FiveStarDetail } from './five-stars-list/five-stars-list.component';
import { FourStarDetail } from './four-stars-list/four-stars-list.component';
import { ColorsUtils } from '../../shared/colors.utils';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(
    private _gw: GenshinWishesService,
    private _translate: TranslateService
  ) {}

  getFocusDistribution(
    stats$: Observable<Stats>,
    rankType: 4 | 5
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
      map((stats) => {
        const focused = stats.wishes.filter(
          (w) =>
            w.banner?.items &&
            w.banner.items.find(
              (i) => w.item?.rankType === rankType && i.itemId === w.itemId
            )
        ).length;
        const focusable = stats.wishes.filter(
          (w) => w.banner?.items?.length && w.item?.rankType === rankType
        ).length;

        return {
          labels: [
            this._translate.instant('wishes.exclusive'),
            this._translate.instant('wishes.notExclusive'),
          ],
          datasets: [
            {
              ...ColorsUtils.getColorsFor([rankType, 1]),
              borderWidth: 1,
              data: [focused, focusable - focused],
            },
          ],
        };
      })
    );
  }

  getFourStarsDetails(
    stats$: Observable<Stats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
      map((stats) => {
        const characters = stats.wishes.filter(
          (w) => w.item?.rankType === 4 && w.item?.itemType === 'Character'
        ).length;

        return {
          labels: [
            this._translate.instant('wishes.itemType$.Character'),
            this._translate.instant('wishes.itemType$.Weapon'),
          ],
          datasets: [
            {
              ...ColorsUtils.getColorsFor([4, 1]),
              borderWidth: 1,
              data: [characters, stats.count4Stars - characters],
            },
          ],
        };
      })
    );
  }

  getRankDistribution(
    stats$: Observable<Stats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
      map((stats) => ({
        labels: ['★★★', '★★★★', '★★★★★'],
        datasets: [
          {
            ...ColorsUtils.getColorsFor([1, 4, 5], true),
            borderWidth: 1,
            data: [
              stats.count - stats.count4Stars - stats.count5Stars,
              stats.count4Stars,
              stats.count5Stars,
            ],
          },
        ],
      }))
    );
  }

  getFiveStarsList(stats$: Observable<Stats>): Observable<FiveStarDetail[]> {
    return stats$.pipe(
      map((stats) => {
        return stats.wishes
          .filter((w) => w?.item?.rankType === 5)
          .reduce((acc, w2) => {
            if (!w2.item) return acc;

            if (!acc[w2.item.itemId])
              acc[w2.item.itemId] = { item: w2.item, wishes: [] };
            acc[w2.item.itemId].wishes.push(w2);
            return acc;
          }, {} as Record<number, FiveStarDetail>);
      }),
      map((records) => {
        const details = Object.getOwnPropertyNames(records).map((itemId) => {
          const record = records[+itemId];

          record.wishes.sort(
            (w1, w2) =>
              new Date(w2.time).getTime() - new Date(w1.time).getTime()
          );

          return record;
        });

        details.sort(
          (d1, d2) =>
            new Date(d2.wishes[0].time).getTime() -
            new Date(d1.wishes[0].time).getTime()
        );

        return details;
      })
    );
  }

  getFourStarsList(stats$: Observable<Stats>): Observable<FourStarDetail[]> {
    return stats$.pipe(
      map((stats) => {
        let lastGachaType = 0;
        let lastIndex = 0;

        return stats.wishes
          .filter((w) => w?.item?.rankType === 4)
          .reduce((acc, w2) => {
            if (!w2.item) return acc;

            if (lastGachaType !== w2.gachaType) {
              lastIndex = 0;
            }
            lastGachaType = w2.gachaType;

            if (!acc[w2.item.itemId])
              acc[w2.item.itemId] = { item: w2.item, wishes: [] };
            acc[w2.item.itemId].wishes.push(w2);
            lastIndex = w2.index;
            return acc;
          }, {} as Record<number, FourStarDetail>);
      }),
      map((records) => {
        const details = Object.getOwnPropertyNames(records).map(
          (itemId) => records[+itemId]
        );

        details.sort((d1, d2) => d2.wishes.length - d1.wishes.length);

        return details;
      })
    );
  }

  getBannerActivity(
    stats$: Observable<Stats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
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
          datasets: [5, 4, 3].map((rankType, index) => ({
            label: new Array(rankType)
              .fill(0)
              .map(() => '★')
              .join(''),
            pointHitRadius: 15,
            pointStyle: 'circle',
            pointBorderWidth: 0,
            pointRadius: 1,
            borderWidth: 1,
            ...ColorsUtils.getColorsFor([5, 4, 3], false, index),
            data: labels.map(
              (date) =>
                countsPerDay.find(
                  (c2) => c2.date === date && c2.rankType === rankType
                )?.count || 0
            ),
          })),
        };
      })
    );
  }
}
