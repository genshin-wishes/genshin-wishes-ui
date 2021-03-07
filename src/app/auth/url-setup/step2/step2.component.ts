import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { LangService } from '../../../shared/lang.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styles: [
    `
      p {
        white-space: pre-wrap;
      }
    `,
  ],
})
export class Step2Component {
  @Input()
  actions!: TemplateRef<ElementRef>;

  devices = [
    {
      title: 'PC',
      expanded: this.platform.isBrowser,
      mdFile$: this._lang.lang$.pipe(
        map((lang) => 'assets/faq/link/pc-' + lang + '.md')
      ),
      videoUrl$: this._lang.lang$.pipe(
        map((lang) =>
          lang === 'fr' ? environment.howTo.pc.fr : environment.howTo.pc.en
        )
      ),
    },
    {
      title: 'Android',
      expanded: this.platform.ANDROID,
      mdFile$: this._lang.lang$.pipe(
        map((lang) => 'assets/faq/link/android-' + lang + '.md')
      ),
      videoUrl$: this._lang.lang$.pipe(
        map((lang) =>
          lang === 'fr'
            ? environment.howTo.android.fr
            : environment.howTo.android.en
        )
      ),
    },
    {
      title: 'iOS',
      expanded: this.platform.IOS,
      mdFile$: this._lang.lang$.pipe(
        map((lang) => 'assets/faq/link/ios-' + lang + '.md')
      ),
      videoUrl$: this._lang.lang$.pipe(
        map((lang) =>
          lang === 'fr' ? environment.howTo.ios.fr : environment.howTo.ios.en
        )
      ),
    },
  ];

  constructor(public platform: Platform, private _lang: LangService) {}
}
