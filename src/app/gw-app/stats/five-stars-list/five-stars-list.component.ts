import { Component, Input } from '@angular/core';
import { Wish } from '../../../api/genshin-wishes/wish';
import { Item } from '../../../api/item';

export type FiveStarDetail = {
  item: Item;
  wishes: Wish[];
};

const MAX_STEP = 2;

@Component({
  selector: 'app-five-stars-list',
  templateUrl: './five-stars-list.component.html',
  styleUrls: ['./five-stars-list.component.scss'],
})
export class FiveStarsListComponent {
  @Input()
  set fiveStarsList(fourStarsList: FiveStarDetail[]) {
    this._fiveStarsList = fourStarsList;
    this.max = MAX_STEP;
  }
  get fiveStarsList(): FiveStarDetail[] {
    return this._fiveStarsList;
  }
  private _fiveStarsList!: FiveStarDetail[];

  max = MAX_STEP;

  loadMore(): void {
    this.max += MAX_STEP;
  }
}
