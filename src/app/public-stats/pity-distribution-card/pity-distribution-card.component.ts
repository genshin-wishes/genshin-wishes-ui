import { Component, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-pity-distribution-card',
  templateUrl: './pity-distribution-card.component.html',
  styleUrls: ['./pity-distribution-card.component.scss'],
})
export class PityDistributionCardComponent {
  @Input()
  distribution5!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };
  @Input()
  distribution4!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };

  rank: 5 | 4 = 5;
}
