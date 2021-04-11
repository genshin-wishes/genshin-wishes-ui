import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, exhaustMap, map, shareReplay, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../api/genshin-wishes/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { LocaleToLanguageName } from '../api/genshin-wishes/constants';

export type Lang = string;

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private _locales: string[] = [];

  readonly locales$ = this._http.get<string[]>('/i18n/i18n.json').pipe(
    catchError(() => of(['en-US'])),
    map((locales) => {
      locales.sort((l1, l2) => l1.localeCompare(l2));

      return locales;
    }),
    tap((locales) => (this._locales = locales)),
    shareReplay(1)
  );
  private _lang$ = new Subject<string>();
  readonly lang$ = this.locales$.pipe(
    exhaustMap(() => this._lang$),
    shareReplay(1)
  );

  constructor(
    private _auth: AuthService,
    private _http: HttpClient,
    private _translate: TranslateService
  ) {
    this.lang$.subscribe((lang) => {
      this._translate.use(lang);
    });

    this.locales$
      .pipe(
        exhaustMap(() =>
          this._auth.user$.pipe(map(this._getLangFromUser.bind(this)))
        )
      )
      .subscribe((lang) => this._lang$.next(lang));
  }

  getCurrentLang(): Lang {
    return this._getLangFromUser(this._auth.getCurrentUser());
  }

  getLanguages(): Observable<LocaleToLanguageName> {
    return this.locales$.pipe(
      exhaustMap((locales) =>
        this._http.get<LocaleToLanguageName>('/api/public/languages', {
          params: {
            locales,
          },
        })
      )
    );
  }

  private _getLangFromUser(user: User | null): string {
    const wanted = user?.lang || this._translate.getBrowserCultureLang();
    const fallBack = this._translate.getBrowserLang();

    return (
      this._locales.find((l) => l === wanted) ||
      this._locales.find((l) => l === fallBack) ||
      this._locales.find((l) => l.startsWith(fallBack)) ||
      'en-US'
    );
  }
}
