import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';

@Injectable({
  providedIn: 'root',
})
export class StatsResolver implements Resolve<string> {
  constructor(private _gw: GenshinWishesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    return '/api';
  }
}
