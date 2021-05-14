import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-wishes-per-region',
  templateUrl: './wishes-per-region.component.html',
  styleUrls: ['./wishes-per-region.component.scss'],
})
export class WishesPerRegionComponent {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  @Input()
  count!: number;
  @Input()
  wishesPerRegion!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };

  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    plugins: {
      labels: {
        render: (args: {
          label: string;
          value: number;
          percentage: number;
          index: number;
          dataset: ChartDataSets;
        }) => {
          return args.percentage + '% ' + args.label;
        },
        fontColor: (args: {
          label: string;
          value: number;
          percentage: number;
          index: number;
          dataset: ChartDataSets;
        }) => {
          return (args.dataset.borderColor as string[])[args.index];
        },
        precision: 2,
        position: 'outside',
        textMargin: 8,
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

    this.chart.datasets = this.wishesPerRegion.datasets;
    this.chart.labels = this.wishesPerRegion.labels;
    this.chart.ngOnInit();
  }
}
