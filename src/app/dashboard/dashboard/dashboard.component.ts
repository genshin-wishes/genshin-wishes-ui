import { Component, OnInit } from '@angular/core';
import { Banner } from '../../api/genshin-wishes/banner';
import { HttpClient } from '@angular/common/http';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';
import { TopService } from '../../shared/layout/top.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  counts$ = this._gw.countAll();
  banners$ = this._gw.getBanners();

  constructor(private _gw: GenshinWishesService, private _top: TopService) {
    this._top.setTitle('banners.label');
  }
}
