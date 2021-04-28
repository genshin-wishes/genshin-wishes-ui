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
  selector: 'app-focus-distribution',
  templateUrl: './focus-distribution.component.html',
  styleUrls: ['./focus-distribution.component.scss'],
})
export class FocusDistributionComponent implements OnChanges {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  @Input()
  focusDistribution!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };

  @Input()
  rankType!: number;

  options: ChartOptions = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.focusDistribution.currentValue) return;

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMax:
                Math.max(
                  ...(this.focusDistribution.datasets[0].data as number[])
                ) * 1.4,
              min: 0,
              precision: 0,
            },
          },
        ],
      },
      plugins: {
        labels: {
          render: 'value',
          fontColor: (args: {
            label: string;
            value: number;
            percentage: number;
            index: number;
            dataset: ChartDataSets;
          }) => {
            return (args.dataset.borderColor as string[])[args.index];
          },
          fontSize: 24,
          position: 'outside',
          textMargin: 8,
        },
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

    this.chart.datasets = this.focusDistribution.datasets;
    this.chart.labels = this.focusDistribution.labels;
    this.chart.ngOnInit();
  }
}
