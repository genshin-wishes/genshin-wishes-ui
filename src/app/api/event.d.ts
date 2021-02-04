import { Item } from './item';

export interface Event {
  id: number;
  item: Item;
  startDate: Date;
  endDate: Date;
  characterBanner: Blob;
  weaponBanner: Blob;
}
