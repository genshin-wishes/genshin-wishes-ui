import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Platform } from '@angular/cdk/platform';
import { LangService } from '../../../shared/lang.service';
import { AuthUrlAndPersistInfo } from '../../url-input/url-input.component';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styles: [
    `
      p {
        white-space: pre-wrap;
      }
    `,
  ],
})
export class Step1Component {
  @Output()
  finish = new EventEmitter<AuthUrlAndPersistInfo>();
  @Input()
  feedback!: string;
  @Input()
  actions!: TemplateRef<unknown>;

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
    {
      title: 'Console',
      mdFile$: this._lang.lang$.pipe(
        map((lang) => 'assets/faq/link/console-' + lang + '.md')
      ),
    },
  ];

  mihoyoUrl!: AuthUrlAndPersistInfo;

  constructor(public platform: Platform, private _lang: LangService) {}
}
