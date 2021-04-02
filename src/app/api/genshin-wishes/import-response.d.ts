import { BannerType } from './constants';

export interface BannerImportState {
  bannerType: BannerType;
  count: number;
  finished: boolean;
  saved: boolean;
  error: string;
}

export type ImportResponse = Record<BannerType, BannerImportState>;
