import { Injectable } from '@angular/core';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';
import { Stats } from '../api/genshin-wishes/stats';
import { combineLatest, Observable } from 'rxjs';
import { WishFilters } from '../wishes/wish-filters/wish-filters';
import { map } from 'rxjs/operators';
import { ItemNamePipe } from '../shared/layout/item-name.pipe';

const STAR_TO_HEX: { [key: number]: string } = {
  5: '#ffb053',
  4: '#dbb2ff',
  3: '#49acf2',
  1: '#60aa3a',
};

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(
    private _gw: GenshinWishesService,
    private _itemName: ItemNamePipe
  ) {}

  getStats(filters: WishFilters): Observable<Stats> {
    return this._gw.getStats(filters);
  }

  getChartData(
    stats$: Observable<Stats>
  ): Observable<[string, number, string][]> {
    return combineLatest([this._gw.getItems(), stats$]).pipe(
      map(([items, stats]) => {
        const data: [string, number, string][] = [];

        Object.getOwnPropertyNames(stats.countByItem).forEach((itemId) => {
          const item = items.find((i) => i.itemId === +itemId);

          if (!item) return;

          data.push([
            this._itemName.transform(item),
            stats.countByItem[itemId],
            'color: ' + STAR_TO_HEX[item.rankType],
          ]);
        });

        return data;
      })
    );
  }
}
