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

  constructor(private _title: Title, private _translate: TranslateService) {}

  setTitle(
    title: string | null,
    pageTitle?: string | null,
    titleTranslated?: boolean
  ): void {
    title = title || 'app.title';
    pageTitle = pageTitle || title;

    if (pageTitle !== 'app.title') {
      if (titleTranslated)
        this._translate
          .get('app.titleWithPage', { page: title })
          .subscribe((titleTrad) => this._applyTitle(titleTrad, title));
      else
        this._translate
          .get(pageTitle)
          .subscribe((pageTrad) =>
            this._translate
              .get('app.titleWithPage', { page: pageTrad })
              .subscribe((titleTrad) => this._applyTitle(titleTrad, pageTrad))
          );
    } else
      this._translate
        .get(title)
        .subscribe((titleTrad) => this._applyTitle(titleTrad));
  }

  private _applyTitle(title: string, pageTitle?: string | null): void {
    this._title$.next(pageTitle || title);
    this._title.setTitle(title);
  }
}
