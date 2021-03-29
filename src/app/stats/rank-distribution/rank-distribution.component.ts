import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-rank-distribution',
  templateUrl: './rank-distribution.component.html',
  styleUrls: ['./rank-distribution.component.scss'],
})
export class RankDistributionComponent {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  @Input()
  rankDistribution!: {
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

    this.chart.datasets = this.rankDistribution.datasets;
    this.chart.labels = this.rankDistribution.labels;
    this.chart.ngOnInit();
  }
}
