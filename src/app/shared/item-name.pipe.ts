import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../api/item';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LangService } from './lang.service';

@Pipe({
  name: 'itemName',
})
export class ItemNamePipe implements PipeTransform {
  constructor(
    private _lang: LangService,
    private _translate: TranslateService
  ) {}

  transform(item?: Item): Observable<string> {
    if (!item) return of('');

    return this._lang.lang$.pipe(map(() => this.transformSync(item)));
  }

  transformSync(item?: Item): string {
    if (!item) return '';

    const key = 'items.' + item.itemId;
    const translation = this._translate.instant(key);

    return !item ? '' : translation !== key ? translation : item.name;
  }
}
