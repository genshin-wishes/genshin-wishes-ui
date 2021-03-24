import { Item } from './item';
import { BannerType } from './genshin-wishes/genshin-wishes.service';

export interface Banner {
  id: number;
  items: Item[];
  start: Date;
  end: Date;
  gachaType: BannerType;
  image: {
    url: string;
  };
}
