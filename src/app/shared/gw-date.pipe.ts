import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from './lang.service';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'gwDate',
})
export class GwDatePipe implements PipeTransform {
  constructor(private _lang: LangService) {}

  transform(value: unknown, format?: string, timezone?: string): string | null {
    const datePipe = new DatePipe(
      this._lang.getCurrentLang() === 'fr' ? 'fr-FR' : 'en-US'
    );

    return datePipe.transform(value, format, timezone);
  }
}
