import { Component, Input } from '@angular/core';
import { PublicStats } from '../public-stats';
import { Banner } from '../../api/banner';
import { BannerType } from '../../api/genshin-wishes/constants';

@Component({
  selector: 'app-event-banner',
  templateUrl: './event-banner.component.html',
  styleUrls: ['./event-banner.component.scss'],
})
export class EventBannerComponent {
  @Input()
  banner!: BannerType;
  @Input()
  event!: Banner;
  @Input()
  stats!: PublicStats;

  BannerType = BannerType;
}
