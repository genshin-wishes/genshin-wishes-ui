import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../api/item';
import { LangService } from './lang.service';

@Pipe({
  name: 'itemName',
})
export class ItemNamePipe implements PipeTransform {
  constructor(private _lang: LangService) {}

  transform(item?: Item): string {
    return !item ? '' : item.name;
  }
}
