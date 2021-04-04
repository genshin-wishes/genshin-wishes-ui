import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-wish-distribution',
  templateUrl: './wish-distribution.component.html',
  styleUrls: ['./wish-distribution.component.scss'],
})
export class WishDistributionComponent {
  @Input()
  wishDistribution!: ChartDataSets[];

  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'rgba(255, 255, 255, 0.87)',
      },
    },
    scales: {
      yAxes: [
        {
          id: 'diff-4y',
          type: 'linear',
          ticks: {
            fontColor: 'rgba(255, 255, 255, 0.87)',
          },
        },
        {
          id: 'diff-5y',
          type: 'linear',
          ticks: {
            fontColor: 'rgba(255, 255, 255, 0.87)',
          },
        },
      ],
      xAxes: [
        {
          id: 'diff-4x',
          type: 'linear',
          ticks: {
            fontColor: 'rgba(255, 255, 255, 0.87)',
          },
        },
        {
          id: 'diff-5x',
          type: 'linear',
          ticks: {
            fontColor: 'rgba(255, 255, 255, 0.87)',
          },
        },
      ],
    },
  };
}
