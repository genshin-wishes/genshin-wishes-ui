import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const COOKIE_CONSENT = 'cookie-consent';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent {
  consented = false;

  constructor(private _cookie: CookieService) {}

  consent(): void {
    this._cookie.set(COOKIE_CONSENT, '');
    this.consented = true;
  }
}
