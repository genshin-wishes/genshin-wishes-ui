import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../api/item';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'itemName',
})
export class ItemNamePipe implements PipeTransform {
  constructor(private _translate: TranslateService) {}

  transform(item?: Item): string {
    if (!item) return '';

    const key = 'items.' + item.itemId;
    const translation = this._translate.instant(key);

    return !item ? '' : translation !== key ? translation : item.name;
  }
}
