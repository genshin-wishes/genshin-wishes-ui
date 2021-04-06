import { Component, Input } from '@angular/core';
import { FiveStarDetail } from '../five-stars-list.component';
import { Wish } from '../../../../api/genshin-wishes/wish';
import {
  BannerToId,
  BannerType,
  IdToBanner,
  PITY_5_BY_TYPE,
} from '../../../../api/genshin-wishes/constants';

@Component({
  selector: 'app-five-stars-history',
  templateUrl: './five-stars-history.component.html',
  styleUrls: ['./five-stars-history.component.scss'],
})
export class FiveStarsHistoryComponent {
  @Input()
  detail!: FiveStarDetail;

  PITY_5_BY_TYPE = PITY_5_BY_TYPE;

  IdToBanner = IdToBanner;

  permanentPity = PITY_5_BY_TYPE[BannerType.CHARACTER_EVENT];

  isFocused(wish: Wish): boolean {
    return !!wish.banner?.items.find((i) => i.itemId === wish.item?.itemId);
  }
}
