import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { LangService } from '../../shared/lang.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { TopService } from '../../shared/layout/top.service';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.scss'],
})
export class LandingCardComponent {
  gtMd$ = this._mediaObserver
    .asObservable()
    .pipe(
      map(() => (this._mediaObserver.isActive('gt-md') ? 'gt-md' : 'lt-lg'))
    );

  youtubeLink$ = this._lang.lang$.pipe(
    map((lang) =>
      this._sanitizer.bypassSecurityTrustResourceUrl(
        environment.demo +
          '&autoplay=1&controls=0&modestbranding=1&loop=1&origin=' +
          environment.websiteUrl
      )
    )
  );

  constructor(
    private _mediaObserver: MediaObserver,
    private _sanitizer: DomSanitizer,
    private _lang: LangService,
    private _top: TopService
  ) {
    this._top.setTitle(null);
  }
}
