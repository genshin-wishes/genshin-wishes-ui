import { Component } from '@angular/core';
import { GenshinWishesService } from '../api/genshin-wishes/genshin-wishes.service';
import { TopService } from '../shared/layout/top.service';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../shared/lang.service';
import { MihoyoService } from '../api/mihoyo/mihoyo.service';
import { Router } from '@angular/router';
import { AuthUrlAndPersistInfo } from '../auth/url-input/url-input.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  authUrlData!: AuthUrlAndPersistInfo;
  deleteConfirmation = '';
  lang = '';
  userLang = '';

  importing = false;

  constructor(
    private _lang: LangService,
    private _gw: GenshinWishesService,
    private _mihoyo: MihoyoService,
    private _translate: TranslateService,
    private _top: TopService,
    private _router: Router
  ) {
    this._top.setTitle('settings.label');
    this._lang.lang$.pipe(first()).subscribe((lang) => (this.userLang = lang));
  }

  updateAuthUrl(data: AuthUrlAndPersistInfo): void {
    this.importing = true;
    this._mihoyo.auth(data);
    this._gw
      .importWishes()
      .then(() => (this.importing = false))
      .catch(() => (this.importing = false));
  }

  updateLang(lang: string): void {
    this._gw.updateLang(lang).then(() => {
      if (!lang) {
        return;
      }

      this.userLang = lang;
      this._translate.use(lang);
      this._top.setTitle('settings.label');

      window.location.reload();
    });
  }

  deleteAccount(): void {
    this._gw
      .deleteAccount()
      .then(() => this._router.navigate(['/logout']))
      .catch(() => {});
  }
}
