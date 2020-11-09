import { Component, Input } from '@angular/core';
import { SidenavService } from '../../../core/sidenav.service';
import { GenshinWishesService } from '../../../api/genshin-wishes/genshin-wishes.service';
import { TopService } from '../top.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input()
  sidenavToggle = true;
  @Input()
  withActions = true;
  @Input()
  withLogout = false;

  loading = false;

  title$ = this._top.title$;

  constructor(
    private _sidenav: SidenavService,
    private _top: TopService,
    private _gw: GenshinWishesService
  ) {}

  toggle() {
    this._sidenav.toggle();
  }

  importWishes() {
    this.loading = true;

    this._gw
      .importWishes()
      .then(() => (this.loading = false))
      .catch(() => (this.loading = false));
  }
}
