import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TopService {
  private _title$ = new BehaviorSubject<string>('app.title');
  title$ = this._title$.asObservable();

  constructor(private _title: Title, private _translate: TranslateService) {}

  setTitle(title: string | null, pageTitle?: string | null): void {
    title = title || 'app.title';
    pageTitle = pageTitle || title;

    this._title$.next(title);

    if (pageTitle !== 'app.title')
      this._title.setTitle(
        this._translate.instant('app.titleWithPage', {
          page: this._translate.instant(pageTitle),
        })
      );
    else this._title.setTitle(this._translate.instant(title));
  }
}
