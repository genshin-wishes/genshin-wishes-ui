import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.getActivate();
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.getActivate();
  }

  private getActivate() {
    return this._auth.user$.pipe(
      first(),
      map((user) => {
        if (!user) return this._router.createUrlTree(['/']);

        if (!!user.mihoyoUid) return true;

        return this._router.createUrlTree(['/setup']);
      })
    );
  }
}
