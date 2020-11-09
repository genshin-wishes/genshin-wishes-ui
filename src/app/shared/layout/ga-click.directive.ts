import { Directive, HostListener, Input } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[gaClick]',
})
export class GaClickDirective {
  @Input()
  gaClick!: string;

  constructor(private _ga: GoogleAnalyticsService) {}

  @HostListener('click')
  onClick(): void {
    if (this.gaClick) {
      this._ga.event(this.gaClick);
    }
  }
}
