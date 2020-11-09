import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(
    private _gw: GenshinWishesService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.getActivate();
  }

  private getActivate() {
    return this._auth.user$.pipe(
      map((user) => {
        if (!!user)
          return !!user.mihoyoUid
            ? this._router.createUrlTree(['/banners'])
            : this._router.createUrlTree(['/setup']);

        return true;
      })
    );
  }
}
