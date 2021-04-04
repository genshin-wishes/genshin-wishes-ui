import { Injectable } from '@angular/core';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';
import { Stats } from '../../api/genshin-wishes/stats';
import { Observable } from 'rxjs';
import { WishFilters } from '../wishes/wish-filters/wish-filters';
import { map } from 'rxjs/operators';
import { ItemNamePipe } from '../../shared/item-name.pipe';
import { Label } from 'ng2-charts';
import * as Chart from 'chart.js';
import { ChartColor, ChartDataSets, Scriptable } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { FiveStarDetail } from './five-stars-list/five-stars-list.component';
import { FourStarDetail } from './four-stars-list/four-stars-list.component';
import { BannerType } from '../../api/genshin-wishes/constants';

const RANK_TO_RGB: { [key: number]: (opacity: number) => string } = {
  5: (opacity) => `rgba(255, 138, 0, ${opacity})`,
  4: (opacity) => `rgba(187, 134, 252, ${opacity})`,
  3: (opacity) => `rgba(3, 218, 197, ${opacity})`,
  1: (opacity) => `rgba(151, 151, 151, ${opacity})`,
};

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(
    private _gw: GenshinWishesService,
    private _translate: TranslateService,
    private _itemName: ItemNamePipe
  ) {}

  getStats(banner: BannerType, filters: WishFilters): Observable<Stats> {
    return this._gw.getStats(banner, filters);
  }

  getFocusDistribution(
    stats$: Observable<Stats>
  ): Observable<{ labels: Label[]; datasets: ChartDataSets[] }> {
    return stats$.pipe(
      map((stats) => {
        const focused = stats.wishes.filter(
          (w) =>
            w.banner?.items && w.banner.items.find((i) => i.itemId === w.itemId)
        ).length;
        const focusable = stats.wishes.filter(
          (w) => w.banner?.items?.length && w.item?.rankType === 5
        ).length;

        return {
          labels: [
            this._translate.instant('wishes.exclusive'),
            this._translate.instant('wishes.notExclusive'),
          ],
          datasets: [
            {
              ...this.getColorsFor([5, 1]),
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
          (w) => w.item?.itemType === 'Character'
        ).length;

        return {
          labels: [
            this._translate.instant('wishes.itemType$.Character'),
            this._translate.instant('wishes.itemType$.Weapon'),
          ],
          datasets: [
            {
              ...this.getColorsFor([4, 1]),
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
            ...this.getColorsFor([1, 4, 5], true),
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
            ...this.getColorsFor([5, 4, 3], false, index),
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

  private getColorsFor(
    ranks: number[],
    radial?: boolean,
    index?: number
  ): {
    pointHoverBackgroundColor: string | string[];
    pointHoverBorderColor: string | string[];
    pointBackgroundColor: string | string[];
    pointBorderColor: string | string[];
    hoverBorderColor: string | string[];
    hoverBackgroundColor: string | string[];
    borderColor: string | string[];
    backgroundColor: ChartColor | ChartColor[] | Scriptable<ChartColor>;
  } {
    const fullOpacity =
      index !== undefined
        ? RANK_TO_RGB[ranks[index]](1)
        : ranks.map((rank) => RANK_TO_RGB[rank](1));
    return {
      pointBackgroundColor: fullOpacity,
      pointBorderColor: fullOpacity,
      pointHoverBackgroundColor: fullOpacity,
      pointHoverBorderColor: fullOpacity,
      hoverBorderColor: fullOpacity,
      hoverBackgroundColor:
        index !== undefined
          ? RANK_TO_RGB[ranks[index]](0.3)
          : ranks.map((rank) => RANK_TO_RGB[rank](0.3)),
      borderColor: fullOpacity,
      backgroundColor: (args: {
        chart?: Chart;
        dataIndex?: number;
        dataset?: ChartDataSets;
        datasetIndex?: number;
      }) => {
        const canvas = args.chart?.canvas;
        const ctx = canvas?.getContext('2d');

        if (!ctx || !canvas) return '';

        const gradient = radial
          ? ctx.createRadialGradient(
              (canvas.parentElement?.clientWidth || 0) / 2,
              (canvas.parentElement?.clientHeight || 0) / 2,
              0,
              (canvas.parentElement?.clientWidth || 0) / 2,
              (canvas.parentElement?.clientHeight || 0) / 2,
              (canvas.parentElement?.clientHeight || 0) / 2 + 80
            )
          : ctx.createLinearGradient(
              0,
              0,
              0,
              (canvas.parentElement?.clientHeight || 0) * 1.6
            );

        gradient.addColorStop(
          0,
          RANK_TO_RGB[
            ranks[(index !== undefined ? index : args.dataIndex) || 0]
          ](0.3)
        );
        gradient.addColorStop(
          0.5,
          RANK_TO_RGB[
            ranks[(index !== undefined ? index : args.dataIndex) || 0]
          ](0)
        );

        return gradient;
      },
    };
  }
}
