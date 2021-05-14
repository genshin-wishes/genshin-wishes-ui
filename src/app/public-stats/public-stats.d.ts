import { Item } from '../api/item';
import { Banner } from '../api/banner';

export interface CountPerDay {
  date: string;
  count: number;
}

export interface CountPerRegion {
  region: string;
  count: number;
}

export interface CountPerBanner {
  gachaType: number;
  count: number;
}

export interface CountPerPity {
  pity: number;
  count: number;
}

export interface CountPerItemId {
  item?: Item;
  itemId: number;
  count: number;
}

export interface EventStats {
  event: Banner;
  count: number;
  itemIdToCount: CountPerItemId[];
}

export interface PublicStats {
  count: number;
  count5Stars: number;
  count4Stars: number;

  usersCount: number;

  exclusiveRate5Stars: number;
  exclusiveRate4Stars: number;

  usersPerRegion: CountPerRegion[];
  countPerRegion: CountPerRegion[];

  countPerBanner: CountPerBanner[];

  countPerPity5Stars: CountPerPity[];
  countPerPity4Stars: CountPerPity[];

  countPerDay: CountPerDay[];
  countPerItemId: CountPerItemId[];

  latestEventsCounts: {
    [key: string]: { count: number; items: CountPerItemId[] };
  };
}
