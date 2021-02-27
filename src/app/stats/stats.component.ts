import { Component } from '@angular/core';
import { StatsService } from './stats.service';
import { WishFilters } from '../wishes/wish-filters/wish-filters';
import { BehaviorSubject } from 'rxjs';
import { exhaustMap, shareReplay } from 'rxjs/operators';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  filters$ = new BehaviorSubject<WishFilters>(new WishFilters());

  stats$ = this.filters$.pipe(
    exhaustMap((filters) => this._stats.getStats(filters)),
    shareReplay(1)
  );

  chartData$ = this._stats.getChartData(this.stats$);

  ChartType = ChartType;

  columns = [
    'Item',
    'Count',
    {
      role: 'style',
    },
  ];

  Object = Object;

  constructor(private _stats: StatsService) {}
}
