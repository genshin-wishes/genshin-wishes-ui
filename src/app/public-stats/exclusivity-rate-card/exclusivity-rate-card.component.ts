import { Component, Input } from '@angular/core';
import { BannerType } from '../../api/genshin-wishes/constants';

@Component({
  selector: 'app-exclusivity-rate-card',
  templateUrl: './exclusivity-rate-card.component.html',
  styleUrls: ['./exclusivity-rate-card.component.scss'],
})
export class ExclusivityRateCardComponent {
  @Input()
  banner!: BannerType;
  @Input()
  rate5!: number;
  @Input()
  rate4!: number;

  BannerType = BannerType;
}
