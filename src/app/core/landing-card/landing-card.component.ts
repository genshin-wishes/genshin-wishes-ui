import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { map } from 'rxjs/operators';

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

  constructor(private _mediaObserver: MediaObserver) {}
}
