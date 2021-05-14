import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-count-per-banner',
  templateUrl: './count-per-banner.component.html',
  styleUrls: ['./count-per-banner.component.scss'],
})
export class CountPerBannerComponent {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  @Input()
  countPerBanner!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };
  @Input()
  count!: number;

  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    plugins: {
      labels: {
        render: () => '',
      },
    },
    legend: {
      display: false,
    },
  };

  @HostListener('window:resize')
  resize(): void {
    // workaround

    this.chart.chart.destroy();
    this.chart.chart = (0 as unknown) as Chart;

    this.chart.datasets = this.countPerBanner.datasets;
    this.chart.labels = this.countPerBanner.labels;
    this.chart.ngOnInit();
  }
}
