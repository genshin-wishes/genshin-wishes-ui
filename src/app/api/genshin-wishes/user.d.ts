import { Lang } from '../../shared/lang.service';

export interface User {
  email: string;
  lang: Lang;
  mihoyoUid: string;
  mihoyoUsername: string;
}
