import { Item } from '../item';

export interface Wish {
  id: number;
  index: number;
  gachaType: number;
  item?: Item; // nullable if database is not up to date
  time: Date;
}
