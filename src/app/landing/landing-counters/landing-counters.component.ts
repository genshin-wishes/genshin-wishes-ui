import { Component } from '@angular/core';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landing-counters',
  templateUrl: './landing-counters.component.html',
  styleUrls: ['./landing-counters.component.scss'],
})
export class LandingCountersComponent {
  usersCount$ = this._gw.getUsersCount();
  wishesCount$ = this._gw.getWishesCount();

  constructor(private _gw: GenshinWishesService) {}
}
