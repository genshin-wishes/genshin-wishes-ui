import { Component, Input } from '@angular/core';
import { Wish } from '../../api/genshin-wishes/wish';

@Component({
  selector: 'app-pity-chip',
  templateUrl: './pity-chip.component.html',
  styleUrls: ['./pity-chip.component.scss'],
})
export class PityChipComponent {
  @Input()
  wish!: Wish;
  @Input()
  rankType!: 3 | 4 | 5;

  readonly thresholds = {
    3: { lucky: 0, soft: 0, hard: 0 },
    4: {
      lucky: 3,
      soft: 6,
      hard: 9,
    },
    5: {
      lucky: 45,
      soft: 74,
      hard: 82,
    },
  };
}
