import { Component, Inject, Input, NgZone } from '@angular/core';
import { Banner } from '../../api/banner';
import { BannerType } from '../../api/genshin-wishes/constants';
import { CountPerItemId } from '../public-stats';
import { Item } from '../../api/item';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
  @Input()
  event!: Banner;
  @Input()
  item!: number;
  @Input()
  elevation = 2;

  @Input()
  itemCounts!: CountPerItemId[];
  @Input()
  total!: number;
  @Input()
  total5!: number;
  @Input()
  total4!: number;

  @Input()
  mode: 'nav' | 'detailed' = 'nav';

  BannerType = BannerType;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _zone: NgZone
  ) {}

  ItemCountFinder = (item: Item) =>
    this.itemCounts.find((count) => count.itemId === item.itemId)?.count || 0;

  scrollToBottom(): void {
    this._zone.runOutsideAngular(() =>
      this._document
        .getElementById('items-list')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    );
  }
}
