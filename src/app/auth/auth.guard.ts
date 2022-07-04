import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  canLoad(): Observable<boolean | UrlTree> {
    return this.getActivate();
  }

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

        return this._router.createUrlTree(['/logout']);
      })
    );
  }
}
