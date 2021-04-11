import { Pipe, PipeTransform } from '@angular/core';
import { LangService } from './lang.service';
import { DatePipe } from '@angular/common';
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
    const datePipe = new DatePipe(this._lang.getCurrentLang());

    format =
      format === 'shortTime'
        ? this._auth.getCurrentUser()?.wholeClock
          ? 'HH:mm'
          : 'h:mm a'
        : format;

    return datePipe.transform(value, format, timezone);
  }
}
