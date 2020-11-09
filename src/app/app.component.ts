import { Component } from '@angular/core';
import { LangService } from './shared/lang.service';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cookieConsented = this._cookie.check('cookie-consent');

  constructor(
    private _auth: AuthService, // included to initialize user
    private _lang: LangService, // included to initialize lang
    private _cookie: CookieService
  ) {}
}
