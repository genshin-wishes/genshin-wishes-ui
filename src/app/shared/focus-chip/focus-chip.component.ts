import { Component, Input } from '@angular/core';
import { Wish } from '../../api/genshin-wishes/wish';

@Component({
  selector: 'app-focus-chip',
  templateUrl: './focus-chip.component.html',
  styleUrls: ['./focus-chip.component.scss'],
})
export class FocusChipComponent {
  @Input()
  wish!: Wish;

  isFocused(wish: Wish): boolean {
    return !!wish.banner?.items.find((i) => i.itemId === wish.item?.itemId);
  }
}
