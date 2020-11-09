import { Item } from '../item';

export interface Wish {
  id: number;
  gachaType: number;
  item: Item;
  time: Date;
}
