import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-wishes-repartition',
  templateUrl: './wishes-repartition.component.html',
  styleUrls: ['./wishes-repartition.component.scss'],
})
export class WishesRepartitionComponent {
  @Input()
  wishesRepartition!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };
  @Input()
  total!: number;

  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;

  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    defaultColor: ['#03DAC5', '#BB86FC', '#E9F846', '#FF8A00'],
    legend: {
      position: 'left',
      labels: {
        fontColor: 'rgba(255, 255, 255, 0.87)',
      },
    },
  };

  constructor() {}

  @HostListener('window:resize')
  resize(): void {
    // workaround

    this.chart.chart.destroy();
    this.chart.chart = (0 as unknown) as Chart;

    this.chart.datasets = this.wishesRepartition.datasets;
    this.chart.labels = this.wishesRepartition.labels;
    this.chart.ngOnInit();
  }
}
