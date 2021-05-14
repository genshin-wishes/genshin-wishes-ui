import { Component, Input } from '@angular/core';
import { CountPerItemId } from '../public-stats';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  @Input()
  total!: number;

  @Input()
  rankType!: number;

  @Input()
  list!: CountPerItemId[];

  @Input()
  currentTab = 0;
  @Input()
  onlyCurrentTab = false;

  types: ('Character' | 'Weapon')[] = ['Character', 'Weapon'];

  RankFilter = (rank: number) => (i: CountPerItemId) =>
    i.item?.rankType === rank;

  TypeFilter = (type: 'Character' | 'Weapon') => (i: CountPerItemId) =>
    i.item?.itemType === type;
}
