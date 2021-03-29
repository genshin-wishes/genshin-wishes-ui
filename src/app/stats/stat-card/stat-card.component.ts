import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input()
  fiveStar!: boolean;

  @Input()
  count!: number;

  @Input()
  average!: number;

  constructor() {}
}
