import { Component, Input } from '@angular/core';
import { Wish } from '../../api/genshin-wishes/wish';
import {
  BannerToId,
  BannerType,
  BannerTypes,
} from '../../api/genshin-wishes/constants';

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
      soft: 9,
      hard: 10,
    },
    5: {
      lucky: 45,
      soft: 74,
      hard: 82,
    },
  };

  readonly weaponThresholds = {
    3: { lucky: 0, soft: 0, hard: 0 },
    4: {
      lucky: 3,
      soft: 8,
      hard: 10,
    },
    5: {
      lucky: 45,
      soft: 63,
      hard: 72,
    },
  };

  computeClass(): string {
    if (!this.wish.item || this.wish.item.rankType < 4) return '';

    const threshold = (this.wish.gachaType ===
    BannerToId[BannerType.WEAPON_EVENT]
      ? this.weaponThresholds
      : this.thresholds)[this.wish.item.rankType];

    return this.wish.pity < threshold.lucky
      ? ' lucky'
      : this.wish.pity < threshold.soft
      ? ' early'
      : this.wish.pity < threshold.hard
      ? ' soft'
      : ' hard';
  }
}
