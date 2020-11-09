import { Item } from '../item';
import { BannerType } from './genshin-wishes.service';

export interface Banner {
  key: BannerType;
  title: string;
  image: string;
  wishes: number;
  pity5: number;
  pity4: number;
  last5?: Item;
  last4?: Item;
}
