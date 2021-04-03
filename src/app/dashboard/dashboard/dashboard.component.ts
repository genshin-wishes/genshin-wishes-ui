import { Component } from '@angular/core';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';
import { TopService } from '../../shared/layout/top.service';
import { BannerToId } from '../../api/genshin-wishes/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  counts$ = this._gw.countAll();
  bannersData$ = this._gw.getBannersData();
  latestEvents$ = this._gw.getLatestEvent();

  BannerToId = BannerToId;

  constructor(private _gw: GenshinWishesService, private _top: TopService) {
    this._top.setTitle('banners.label');
  }
}
