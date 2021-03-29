import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BannerType } from '../../api/genshin-wishes/genshin-wishes.service';
import { Stats } from '../../api/genshin-wishes/stats';
import { Banner } from '../../api/banner';
import { WishFilters } from '../../wishes/wish-filters/wish-filters';

@Component({
  selector: 'app-stats-header',
  templateUrl: './stats-header.component.html',
  styleUrls: ['./stats-header.component.scss'],
})
export class StatsHeaderComponent {
  @Output()
  bannerFilter = new EventEmitter<WishFilters>();

  @Input()
  banner!: BannerType;
  @Input()
  stats!: Stats;
  @Input()
  events!: Banner[];
  @Input()
  filters!: WishFilters;
}
