import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<string> {
  constructor(private _profile: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    return this._profile.getStatsEndpoint(
      route.parent?.parent?.params.profileId
    );
  }
}
