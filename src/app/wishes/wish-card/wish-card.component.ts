import { Component, Input } from '@angular/core';
import { Wish } from '../../api/genshin-wishes/wish';

@Component({
  selector: 'app-wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.scss'],
})
export class WishCardComponent {
  @Input()
  wish!: Wish;
  @Input()
  index!: number;
  @Input()
  height!: number;
  @Input()
  total!: number;

  constructor() {}

  getRankLoop(rank: number) {
    return new Array(rank);
  }
}
