import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../api/genshin-wishes/user';
import { DateAdapter } from '@angular/material/core';

export type Lang = 'fr' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  readonly lang$ = this._auth.user$.pipe(map(this._getLangFromUser.bind(this)));

  constructor(
    private _auth: AuthService,
    private _dateAdapter: DateAdapter<unknown>,
    private _translate: TranslateService
  ) {
    this.lang$.subscribe((lang) => {
      this._translate.use(lang);
      this._dateAdapter.setLocale(lang);
    });
  }

  getCurrentLang(): Lang {
    return this._getLangFromUser(this._auth.getCurrentUser());
  }

  private _getLangFromUser(user: User | null): Lang {
    return (
      user?.lang || (this._translate.getBrowserLang() === 'fr' ? 'fr' : 'en')
    );
  }
}
