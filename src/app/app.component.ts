import { Component } from '@angular/core';
import { getLocaleDirection } from '@angular/common';
import { LangService } from './shared/lang.service';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cookieConsented = this._cookie.check('cookie-consent');
  rtl$ = this._lang.lang$.pipe(map((locale) => getLocaleDirection(locale)));

  constructor(
    private _auth: AuthService, // included to initialize user
    private _lang: LangService, // included to initialize lang
    private _cookie: CookieService
  ) {}
}
