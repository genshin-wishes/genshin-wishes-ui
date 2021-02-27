import { Wish } from './wish';

export interface Stats {
  numberOfWishes: number;
  numberOf4Stars: number;
  numberOf5Stars: number;

  numberOfWishesFiltered: number;

  countByItem: { [key: string]: number };
  countByBanner: { [key: string]: StatsPerBanner };
}

export interface StatsPerBanner {
  last4Stars: Wish;
  last5Stars: Wish;
  count: number;
  count4Stars: number;
  count5Stars: number;
}
