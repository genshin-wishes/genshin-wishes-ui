import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TopService {
  private _title$ = new ReplaySubject<string>(1);
  title$ = this._title$.asObservable();

  private _currentTitle = 'app.title';
  private _currentPageTitle: string = 'app.title';
  private _currentIsTranslated = false;

  constructor(private _title: Title, private _translate: TranslateService) {}

  setTitle(
    title: string | null,
    pageTitle?: string | null,
    titleTranslated?: boolean
  ): void {
    this._currentTitle = title || 'app.title';
    this._currentPageTitle = pageTitle || this._currentTitle;
    this._currentIsTranslated = titleTranslated || false;

    if (pageTitle !== 'app.title') {
      if (titleTranslated)
        this._translate
          .get('app.titleWithPage', { page: title })
          .subscribe((titleTrad) => this._applyTitle(titleTrad, title));
      else
        this._translate
          .get(this._currentPageTitle)
          .subscribe((pageTrad) =>
            this._translate
              .get('app.titleWithPage', { page: pageTrad })
              .subscribe((titleTrad) => this._applyTitle(titleTrad, pageTrad))
          );
    } else
      this._translate
        .get(this._currentTitle)
        .subscribe((titleTrad) => this._applyTitle(titleTrad));
  }

  private _applyTitle(title: string, pageTitle?: string | null): void {
    this._title$.next(pageTitle || title);
    this._title.setTitle(title);
  }

  refreshTitle(): void {
    this.setTitle(
      this._currentTitle,
      this._currentPageTitle,
      this._currentIsTranslated
    );
  }
}
