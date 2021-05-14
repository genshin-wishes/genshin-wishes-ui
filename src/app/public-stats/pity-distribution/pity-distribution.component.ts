import {
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pity-distribution',
  templateUrl: './pity-distribution.component.html',
  styleUrls: ['./pity-distribution.component.scss'],
})
export class PityDistributionComponent implements OnChanges {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  @Input()
  distribution!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };

  options: ChartOptions = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.distribution?.currentValue) return;

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        labels: {
          render: () => '',
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              stepSize: 1,
              callback: (value) => +value,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              callback: (value) =>
                +value >= 1000000
                  ? +value / 1000000 + 'M'
                  : +value >= 1000
                  ? +value / 1000 + 'K'
                  : +value,
              precision: 0,
              suggestedMax:
                Math.max(
                  ...(this.distribution.datasets[0].data as number[]).map(
                    (c, i) =>
                      c +
                      this.distribution.datasets
                        .slice(1, this.distribution.datasets.length)
                        .map((ds) => (ds.data as number[])[i])
                        .reduce((a, b) => a + b, 0)
                  )
                ) * 1.2,
              min: 0,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    };
  }

  @HostListener('window:resize')
  resize(): void {
    // workaround

    this.chart.chart.destroy();
    this.chart.chart = (0 as unknown) as Chart;

    this.chart.datasets = this.distribution.datasets;
    this.chart.labels = this.distribution.labels;
    this.chart.ngOnInit();
  }
}
