import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UrlDialogComponent } from '../../auth/url-dialog/url-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthUrlAndPersistInfo } from '../../auth/url-input/url-input.component';
import { AuthService } from '../../auth/auth.service';

export interface AuthInfo {
  authkey: string;
  game_biz: string;
}

const MIHOYO_AUTH_INFO = 'mihoyoAuthInfo';

@Injectable({
  providedIn: 'root',
})
export class MihoyoService {
  private authInfo: AuthInfo | null = null;

  constructor(
    private _dialog: MatDialog,
    private _cookie: CookieService,
    private _auth: AuthService
  ) {
    this._auth.user$.subscribe((user) => {
      const cookieName = user?.mihoyoUid + ':' + MIHOYO_AUTH_INFO;

      this.authInfo =
        (!user && !this._cookie.check(cookieName)
          ? ''
          : JSON.parse(this._cookie.get(cookieName))) || this.authInfo;
    });
  }

  auth(data: AuthUrlAndPersistInfo): boolean {
    const authInfo = this.getAuthInfoFromUrl(data.authUrl);

    if (authInfo) {
      this.authInfo = authInfo;
      this._persistKey(this.authInfo, data.persist);
      return true;
    }

    return false;
  }

  getAuthkey(): Promise<AuthInfo> {
    if (!this.authInfo) {
      return this.askForUrl();
    }

    return Promise.resolve(this.authInfo);
  }

  invalidateKey(): boolean {
    const cookieKey =
      this._auth.getCurrentUser()?.mihoyoUid + ':' + MIHOYO_AUTH_INFO;
    const hadCookie = !!this._cookie.get(cookieKey);
    this.authInfo = null;
    this._cookie.delete(cookieKey, '/');

    return hadCookie;
  }

  registerKey(authInfo: AuthInfo, hadCookie: boolean): void {
    this.authInfo = authInfo;
    this._persistKey(authInfo, hadCookie);
  }

  private _persistKey(authInfo: AuthInfo, persist: boolean): void {
    const user = this._auth.getCurrentUser();

    if (!user || !user.mihoyoUid) return;

    if (persist) {
      this._cookie.set(
        user.mihoyoUid + ':' + MIHOYO_AUTH_INFO,
        JSON.stringify(authInfo),
        1,
        '/'
      );
    } else {
      this._cookie.delete(user.mihoyoUid + ':' + MIHOYO_AUTH_INFO, '/');
    }
  }

  private askForUrl(): Promise<AuthInfo> {
    return this._dialog
      .open(UrlDialogComponent, {
        maxWidth: '100vw',
      })
      .afterClosed()
      .toPromise()
      .then((data: AuthUrlAndPersistInfo) => {
        if (!data) {
          return Promise.reject();
        }

        const authInfoFromUrl = this.getAuthInfoFromUrl(data.authUrl);

        if (!authInfoFromUrl) {
          return Promise.reject();
        }

        this.authInfo = authInfoFromUrl;
        this._persistKey(this.authInfo, data.persist);

        return authInfoFromUrl;
      });
  }

  private getAuthInfoFromUrl(authUrl: string): AuthInfo | null {
    if (!authUrl) {
      return null;
    }

    authUrl = authUrl.replace('#/', '');

    const authkeyParam = new URLSearchParams(authUrl).get('authkey');
    const gameBizParam = new URLSearchParams(authUrl).get('game_biz');

    return authkeyParam && gameBizParam
      ? {
          authkey: encodeURIComponent(authkeyParam.replace(/\s/g, '+')),
          game_biz: gameBizParam,
        }
      : null;
  }
}
