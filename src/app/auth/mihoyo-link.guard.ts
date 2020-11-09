import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MihoyoLinkGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._auth.user$.pipe(
      first(),
      map((user) => {
        if (!!user)
          return !!user.mihoyoUid
            ? this._router.createUrlTree(['/banners'])
            : true;
        else return this._router.createUrlTree(['/']);
      })
    );
  }
}
