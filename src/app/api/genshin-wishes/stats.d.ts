import { Wish } from './wish';
import { BannerType } from './constants';

export interface CountPerRankAndDay {
  date: string;
  rankType: number;
  count: number;
}

export interface Stats {
  bannerType: BannerType;

  count: number;
  count4Stars: number;
  count5Stars: number;

  gap4Stars: number;
  gap5Stars: number;

  countPerDay: CountPerRankAndDay[];

  wishes: Wish[];
}
