import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from './lang.service';
import { DecimalPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'gwNumber',
})
export class GwNumberPipe implements PipeTransform {
  constructor(private _lang: LangService) {}

  transform(
    value: number | string | null | undefined,
    digitsInfo?: string
  ): Observable<string | null> {
    const currentLang = this._lang.getCurrentLang();
    const numberPipe = new DecimalPipe(currentLang);

    return this._lang.lang$.pipe(
      map((locale) => new DecimalPipe(locale).transform(value, digitsInfo))
    );
  }
}
