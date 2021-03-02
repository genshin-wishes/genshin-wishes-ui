import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { LangService } from '../../shared/lang.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-youtube-link',
  templateUrl: './youtube-link.component.html',
  styleUrls: ['./youtube-link.component.scss'],
})
export class YoutubeLinkComponent {
  @Input()
  label!: string;

  youtubeUrl$ = this._lang.lang$.pipe(
    map((lang) => (lang === 'fr' ? environment.howTo.fr : environment.howTo.en))
  );

  constructor(private _lang: LangService) {}
}
