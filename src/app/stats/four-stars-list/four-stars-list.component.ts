import { Component, Input } from '@angular/core';
import { Wish } from '../../api/genshin-wishes/wish';
import { Item } from '../../api/item';

export type FourStarDetail = {
  item: Item;
  wishes: Wish[];
};

const MAX_STEP = 5;

@Component({
  selector: 'app-four-stars-list',
  templateUrl: './four-stars-list.component.html',
  styleUrls: ['./four-stars-list.component.scss'],
})
export class FourStarsListComponent {
  @Input()
  set fourStarsList(fourStarsList: FourStarDetail[]) {
    this._fourStarsList = fourStarsList;
    this.max = MAX_STEP;
  }
  get fourStarsList(): FourStarDetail[] {
    return this._fourStarsList;
  }
  private _fourStarsList!: FourStarDetail[];

  max = MAX_STEP;

  loadMore(): void {
    this.max += MAX_STEP;
  }
}
