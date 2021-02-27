import { Component, Input } from '@angular/core';
import { StatsPerBanner } from '../../api/genshin-wishes/stats';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input()
  cardTitle!: string;

  @Input()
  statsPerBanner!: StatsPerBanner;

  constructor() {}
}
