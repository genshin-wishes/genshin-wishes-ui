import { Component, Input } from '@angular/core';
import { Banner } from '../../api/genshin-wishes/banner';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss'],
})
export class BannerCardComponent {
  @Input()
  count!: number;
  @Input()
  banner!: Banner;

  constructor() {}
}
