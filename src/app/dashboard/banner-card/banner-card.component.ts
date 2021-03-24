import { Component, Input } from '@angular/core';
import { BannerData } from '../../api/genshin-wishes/banner';
import { Banner } from '../../api/banner';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss'],
})
export class BannerCardComponent {
  @Input()
  count!: number;
  @Input()
  bannerData!: BannerData;
  @Input()
  banner!: Banner;

  constructor() {}
}
