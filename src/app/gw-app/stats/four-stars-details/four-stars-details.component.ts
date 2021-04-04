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
  selector: 'app-four-stars-details',
  templateUrl: './four-stars-details.component.html',
  styleUrls: ['./four-stars-details.component.scss'],
})
export class FourStarsDetailsComponent implements OnChanges {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  @Input()
  fourStarsDetails!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };

  options: ChartOptions = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.fourStarsDetails.currentValue) return;

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMax:
                Math.max(
                  ...(this.fourStarsDetails.datasets[0].data as number[])
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

    this.chart.datasets = this.fourStarsDetails.datasets;
    this.chart.labels = this.fourStarsDetails.labels;
    this.chart.ngOnInit();
  }
}
