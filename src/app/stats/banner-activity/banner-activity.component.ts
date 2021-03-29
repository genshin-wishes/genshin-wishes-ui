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
  selector: 'app-banner-activity',
  templateUrl: './banner-activity.component.html',
  styleUrls: ['./banner-activity.component.scss'],
})
export class BannerActivityComponent implements OnChanges {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  @Input()
  bannerActivity!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };

  options: ChartOptions = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.bannerActivity?.currentValue) return;

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month',
            },
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              suggestedMax:
                Math.max(
                  ...(this.bannerActivity.datasets[0].data as number[]).map(
                    (c, i) =>
                      c +
                      this.bannerActivity.datasets
                        .slice(1, this.bannerActivity.datasets.length)
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

    this.chart.datasets = this.bannerActivity.datasets;
    this.chart.labels = this.bannerActivity.labels;
    this.chart.ngOnInit();
  }
}
