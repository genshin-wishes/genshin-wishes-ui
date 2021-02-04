import { Component, Input } from '@angular/core';
import { Banner } from '../../api/genshin-wishes/banner';
import { Event } from '../../api/event';

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
  @Input()
  event!: Event;

  constructor() {}
}
