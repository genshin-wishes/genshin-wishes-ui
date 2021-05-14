import { Component, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-users-per-region',
  templateUrl: './users-per-region.component.html',
  styleUrls: ['./users-per-region.component.scss'],
})
export class UsersPerRegionComponent {
  @Input()
  count!: number;
  @Input()
  set usersPerRegion(userPerRegion) {
    this._usersPerRegion = userPerRegion;
    this.maxCount = +((userPerRegion.datasets[0].data || [])[0] + '') || 0;
  }

  get usersPerRegion(): {
    labels: Label[];
    datasets: ChartDataSets[];
  } {
    return this._usersPerRegion;
  }

  _usersPerRegion!: {
    labels: Label[];
    datasets: ChartDataSets[];
  };
  maxCount: number = 0;

  colors: ('primary' | 'accent' | 'success')[] = [
    'primary',
    'accent',
    'success',
  ];
}
