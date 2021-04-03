import { BannerType } from './constants';

export interface BannerImportState {
  bannerType: BannerType;
  count: number;
  finished: boolean;
  saved: boolean;
}

export type ImportResponse = Record<BannerType, BannerImportState>;
