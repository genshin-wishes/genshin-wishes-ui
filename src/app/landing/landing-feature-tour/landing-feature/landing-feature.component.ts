import { Component, Input } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landing-feature',
  templateUrl: './landing-feature.component.html',
  styleUrls: ['./landing-feature.component.scss'],
})
export class LandingFeatureComponent {
  @Input()
  img!: string;
  @Input()
  description!: string;

  device$ = this._mediaObserver
    .asObservable()
    .pipe(map(() => (this._mediaObserver.isActive('gt-sm') ? 'pc' : 'mobile')));

  constructor(private _mediaObserver: MediaObserver) {}
}
