import { Wish } from './wish';
import { BannerType } from './constants';

export interface Stats {
  bannerType: BannerType;

  count: number;
  count4Stars: number;
  count5Stars: number;

  gap4Stars: number;
  gap5Stars: number;

  countPerDay: { date: string; rankType: number; count: number }[];

  indexOfLast4?: number;
  indexOfLast5?: number;
  wishes: (Wish & { pity: number })[];
}
