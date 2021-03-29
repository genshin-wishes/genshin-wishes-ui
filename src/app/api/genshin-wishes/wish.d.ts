import { Item } from '../item';
import { Banner } from '../banner';

export interface Wish {
  id: number;
  index: number;
  gachaType: number;
  bannerId?: number; // nullable if lazy
  banner?: Banner;
  itemId?: number; // nullable if database is not up to date
  item?: Item;
  time: Date;
}
