import { Component } from '@angular/core';
import { LangService } from '../../shared/lang.service';
import { first, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { TopService } from '../top.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  file$ = this._lang.lang$.pipe(map((lang) => `i18n/${lang}/faq.md`));

  ready = false;

  constructor(
    private _lang: LangService,
    private _auth: AuthService,
    private _top: TopService
  ) {
    // Component also exists in stand-alone mode for landing page (not logged in user)
    this._auth.user$
      .pipe(first())
      .subscribe((user) => !!user && this._top.setTitle('faq.title'));
  }
}
