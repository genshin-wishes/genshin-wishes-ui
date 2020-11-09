import { Component, Input } from '@angular/core';
import { Item } from '../../../api/item';

@Component({
  selector: 'app-item-img',
  templateUrl: './item-img.component.html',
  styleUrls: ['./item-img.component.scss'],
})
export class ItemImgComponent {
  @Input()
  item!: Item;

  constructor() {}
}
