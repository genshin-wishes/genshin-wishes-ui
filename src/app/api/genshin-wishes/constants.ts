export type LocaleToLanguageName = Record<string, string>;

export enum ApiErrors {
  AUTHKEY_INVALID = 'AUTHKEY_INVALID',
  MIHOYO_UID_DIFFERENT = 'MIHOYO_UID_DIFFERENT',
  MIHOYO_UNREACHABLE = 'MIHOYO_UNREACHABLE',
  NEW_WISHES_DURING_IMPORT = 'NEW_WISHES_DURING_IMPORT',
  ALREADY_IMPORTING = 'ALREADY_IMPORTING',
  MISSING_ITEM = 'MISSING_ITEM',
}

export enum BannerType {
  ALL = 'ALL',
  NOVICE = 'NOVICE',
  PERMANENT = 'PERMANENT',
  CHARACTER_EVENT = 'CHARACTER_EVENT',
  WEAPON_EVENT = 'WEAPON_EVENT',
}

export const IdToBanner: Record<number, BannerType> = {
  '-1': BannerType.ALL,
  301: BannerType.CHARACTER_EVENT,
  200: BannerType.PERMANENT,
  302: BannerType.WEAPON_EVENT,
  100: BannerType.NOVICE,
};
export const BannerToId: Record<string, number> = {
  ALL: -1,
  CHARACTER_EVENT: 301,
  PERMANENT: 200,
  WEAPON_EVENT: 302,
  NOVICE: 100,
};
export const BannerTypes = [
  BannerType.CHARACTER_EVENT,
  BannerType.WEAPON_EVENT,
  BannerType.PERMANENT,
  BannerType.NOVICE,
];
export const PITY_5_BY_TYPE = {
  ALL: -1,
  NOVICE: 90,
  PERMANENT: 90,
  CHARACTER_EVENT: 90,
  WEAPON_EVENT: 80,
};
export const PITY_4 = 10;
