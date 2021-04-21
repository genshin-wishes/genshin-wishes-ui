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

  private _currentTitle = '';
  private _currentIsTranslated = false;

  constructor(private _title: Title, private _translate: TranslateService) {}

  setTitle(title: string | null, titleTranslated?: boolean): void {
    this._currentTitle = title || 'app.title';
    this._currentIsTranslated = titleTranslated || false;

    if (titleTranslated)
      this._translate
        .get('app.titleWithPage', { page: this._currentTitle })
        .subscribe((titleTrad) =>
          this._applyTitle(titleTrad, this._currentTitle)
        );
    else
      this._translate
        .get(this._currentTitle)
        .subscribe((pageTrad) =>
          this._currentTitle === 'app.title'
            ? this._applyTitle(pageTrad, pageTrad)
            : this._translate
                .get('app.titleWithPage', { page: pageTrad })
                .subscribe((titleTrad) =>
                  this._applyTitle(
                    titleTrad,
                    this._currentTitle !== 'app.description'
                      ? pageTrad
                      : titleTrad
                  )
                )
        );
  }

  private _applyTitle(title: string, titleWithoutPage: string): void {
    this._title$.next(titleWithoutPage);
    this._title.setTitle(title);
  }

  refreshTitle(): void {
    this.setTitle(this._currentTitle, this._currentIsTranslated);
  }
}
