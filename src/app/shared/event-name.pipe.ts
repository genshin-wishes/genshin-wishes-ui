import { Pipe, PipeTransform } from '@angular/core';
import { Banner } from '../api/banner';
import { ItemNamePipe } from './item-name.pipe';

@Pipe({
  name: 'eventName',
})
export class EventNamePipe implements PipeTransform {
  constructor(private _itemName: ItemNamePipe) {}

  transform(value: Banner): unknown {
    return value.items
      .filter((i) => i.rankType === 5)
      .map((i) => this._itemName.transform(i))
      .join(' / ');
  }
}
