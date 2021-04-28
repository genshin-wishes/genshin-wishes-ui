import { Item } from './item';
import { BannerType } from './genshin-wishes/constants';

export interface Banner {
  id: number;
  version: string;
  items: Item[];
  start: Date;
  end: Date;
  gachaType: BannerType;
  image?: {
    url: string;
  };
}
