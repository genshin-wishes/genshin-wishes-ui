import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../api/item';

@Pipe({
  name: 'rankType',
})
export class RankTypePipe implements PipeTransform {
  transform(items: Item[], rankType: number): Item[] {
    return items.filter((i) => i.rankType === rankType);
  }
}
