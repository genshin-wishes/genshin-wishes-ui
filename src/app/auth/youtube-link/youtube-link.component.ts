import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { LangService } from '../../shared/lang.service';

const YOUTUBE_FR = 'https://www.youtube.com/watch?v=uObSZ6Dz2Hw';
const YOUTUBE_EN = 'https://www.youtube.com/watch?v=a16X0R_rSZc';

@Component({
  selector: 'app-youtube-link',
  templateUrl: './youtube-link.component.html',
  styleUrls: ['./youtube-link.component.scss'],
})
export class YoutubeLinkComponent {
  @Input()
  label!: string;

  youtubeUrl$ = this._lang.lang$.pipe(
    map((lang) => (lang === 'fr' ? YOUTUBE_FR : YOUTUBE_EN))
  );

  constructor(private _lang: LangService) {}
}
