import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LandingMenuComponent } from '../landing-menu/landing-menu.component';
import { LangService } from '../../shared/lang.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-top',
  templateUrl: './landing-top.component.html',
  styleUrls: ['./landing-top.component.scss'],
})
export class LandingTopComponent {
  locale = this._lang.getCurrentLang();

  user$ = this._auth.user$;

  constructor(
    public router: Router,
    private _auth: AuthService,
    private _dialog: MatDialog,
    private _lang: LangService
  ) {}

  openMenu(): void {
    this._dialog.open(LandingMenuComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '100%',
      height: '100%',
      panelClass: 'no-radius-dialog',
    });
  }

  changeLocale(locale: string): void {
    this._lang.setLocale(locale, true);
  }
}
