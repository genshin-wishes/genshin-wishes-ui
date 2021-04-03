import { Item } from '../item';
import { BannerType } from './constants';

export interface BannerData {
  key: BannerType;
  title: string;
  image: string;
  wishes: number;
  pity5: number;
  since5: number;
  pity4: number;
  since4: number;
  last5?: Item;
  last4?: Item;
}
