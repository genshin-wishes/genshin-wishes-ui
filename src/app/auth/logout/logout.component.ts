import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _gw: GenshinWishesService
  ) {}

  ngOnInit(): void {
    this._gw
      .logout()
      .catch(() => {})
      .finally(() => {
        this._auth.logout();
        this._router.navigate(['/']);
      });
  }
}
