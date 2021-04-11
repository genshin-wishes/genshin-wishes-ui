import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../api/item';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'itemName',
})
export class ItemNamePipe implements PipeTransform {
  constructor(private _translate: TranslateService) {}

  transform(item?: Item): string {
    return !item ? '' : this._translate.instant('items.' + item.itemId);
  }
}
