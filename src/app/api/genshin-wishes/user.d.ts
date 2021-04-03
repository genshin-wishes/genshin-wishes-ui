import { Lang } from '../../shared/lang.service';

export interface User {
  email: string;
  lang: Lang | null;
  wholeClock: boolean;
  mihoyoUid: string;
  mihoyoUsername: string;
}
