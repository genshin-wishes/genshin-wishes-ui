import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../api/genshin-wishes/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocaleToLanguageName } from '../api/genshin-wishes/constants';
import { DOCUMENT } from '@angular/common';
import i18n from 'genshin-wishes-i18n/i18n/i18n.json';
import { CookieService } from 'ngx-cookie-service';

export type Lang = string;

const COOKIE_LANG = 'lang';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  readonly locales: string[] = (() => {
    i18n.sort();
    return i18n;
  })();
  private _lang$ = new BehaviorSubject<string>('en-US');
  readonly lang$ = this._lang$.asObservable().pipe(shareReplay(1));

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _cookie: CookieService,
    private _auth: AuthService,
    private _http: HttpClient,
    private _translate: TranslateService
  ) {
    this._auth.user$
      .pipe(map(this._getLangFromUser.bind(this)))
      .subscribe((lang) => {
        this.changeLocale(lang);
      });
  }

  setLocale(locale: string, persist?: boolean): void {
    this.changeLocale(locale);

    if (persist) {
      this._cookie.set(COOKIE_LANG, locale, { path: '/' });
    }
  }

  private changeLocale(locale: string): void {
    this._translate.use(locale).subscribe(() => this._lang$.next(locale));
  }

  getCurrentLang(): Lang {
    return this._getLangFromUser(this._auth.getCurrentUser());
  }

  getLanguages(): Observable<LocaleToLanguageName> {
    return this._http.get<LocaleToLanguageName>('/api/public/languages', {
      params: {
        locales: this.locales,
      },
    });
  }

  private _getLangFromUser(user: User | null): string {
    const wanted = this._formatLocale(
      (user && user.mihoyoUid ? user.lang : this._cookie.get(COOKIE_LANG)) ||
        this.document.documentElement.lang ||
        this._translate.getBrowserCultureLang()
    );
    const fallBack = this._translate.getBrowserLang();

    return (
      this.locales.find((l) => l === wanted) ||
      this.locales.find((l) => l === fallBack) ||
      this.locales.find((l) => l.startsWith(fallBack)) ||
      'en-US'
    );
  }

  private _formatLocale(locale: string): string {
    if (!locale) return '';

    if (locale.indexOf('-') !== -1)
      locale = locale.split('-')[0] + '-' + locale.split('-')[1].toUpperCase();

    return locale;
  }
}
