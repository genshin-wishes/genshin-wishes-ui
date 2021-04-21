import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UrlDialogComponent } from '../../auth/url-dialog/url-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthUrlAndPersistInfo } from '../../auth/url-input/url-input.component';
import { AuthService } from '../../auth/auth.service';

const MIHOYO_AUTHKEY_KEY = 'mihoyoAuthkey';

@Injectable({
  providedIn: 'root',
})
export class MihoyoService {
  private authkey: string | null = null;

  constructor(
    private _dialog: MatDialog,
    private _cookie: CookieService,
    private _auth: AuthService
  ) {
    this._auth.user$.subscribe(
      (user) =>
        (this.authkey =
          (!user
            ? ''
            : this._cookie.get(user?.mihoyoUid + ':' + MIHOYO_AUTHKEY_KEY)) ||
          this.authkey)
    );
  }

  auth(data: AuthUrlAndPersistInfo): boolean {
    const authkey = this.getAuthkeyFromUrl(data.authUrl);

    if (authkey) {
      this.authkey = authkey;
      this._persistKey(this.authkey, data.persist);
      return true;
    }

    return false;
  }

  getAuthkey(): Promise<string> {
    if (!this.authkey) {
      return this.askForUrl();
    }

    return Promise.resolve(this.authkey);
  }

  invalidateKey(): boolean {
    const cookieKey =
      this._auth.getCurrentUser()?.mihoyoUid + ':' + MIHOYO_AUTHKEY_KEY;
    const hadCookie = !!this._cookie.get(cookieKey);
    this.authkey = null;
    this._cookie.delete(cookieKey, '/');

    return hadCookie;
  }

  registerKey(authkey: string, hadCookie: boolean): void {
    this.authkey = authkey;
    this._persistKey(authkey, hadCookie);
  }

  private _persistKey(key: string, persist: boolean): void {
    const user = this._auth.getCurrentUser();

    if (!user || !user.mihoyoUid) return;

    if (persist) {
      this._cookie.set(user.mihoyoUid + ':' + MIHOYO_AUTHKEY_KEY, key, 1, '/');
    } else {
      this._cookie.delete(user.mihoyoUid + ':' + MIHOYO_AUTHKEY_KEY, '/');
    }
  }

  private askForUrl(): Promise<string> {
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

        const authkeyFromUrl = this.getAuthkeyFromUrl(data.authUrl);

        if (!authkeyFromUrl) {
          return Promise.reject();
        }

        this.authkey = authkeyFromUrl;
        this._persistKey(this.authkey, data.persist);

        return authkeyFromUrl;
      });
  }

  private getAuthkeyFromUrl(authUrl: string): string | null {
    if (!authUrl) {
      return null;
    }

    const authkeyParam = new URLSearchParams(authUrl).get('authkey');

    return (
      authkeyParam &&
      encodeURIComponent(authkeyParam.replace(/\s/g, '+').replace('#/', ''))
    );
  }
}
