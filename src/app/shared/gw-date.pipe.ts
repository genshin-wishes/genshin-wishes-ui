import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from './lang.service';
import { DatePipe, FormatWidth, getLocaleTimeFormat } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Pipe({
  name: 'gwDate',
})
export class GwDatePipe implements PipeTransform {
  constructor(private _lang: LangService, private _auth: AuthService) {}

  transform(
    value: string | number | Date,
    format?: string,
    timezone?: string
  ): string | null {
    const currentLang = this._lang.getCurrentLang();
    const datePipe = new DatePipe(currentLang);
    const localeMediumTime = getLocaleTimeFormat(
      currentLang,
      FormatWidth.Short
    );

    format =
      format === 'shortTime' &&
      this._auth.getCurrentUser()?.wholeClock != undefined
        ? this._auth.getCurrentUser()?.wholeClock
          ? 'HH:mm'
          : localeMediumTime.includes('a')
          ? localeMediumTime
          : 'h:mm a'
        : format;

    return datePipe.transform(value, format, timezone);
  }
}
