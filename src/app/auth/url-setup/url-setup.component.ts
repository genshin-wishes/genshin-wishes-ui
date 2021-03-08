import { Component } from '@angular/core';
import {
  ApiErrors,
  BannerTypes,
  GenshinWishesService,
} from '../../api/genshin-wishes/genshin-wishes.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MihoyoService } from '../../api/mihoyo/mihoyo.service';
import { User } from '../../api/genshin-wishes/user';
import { TopService } from '../../shared/layout/top.service';
import { exhaustMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { SnackService } from '../../shared/snack/snack.service';
import { AuthUrlAndPersistInfo } from '../url-input/url-input.component';

@Component({
  selector: 'app-url-setup',
  templateUrl: './url-setup.component.html',
  styleUrls: ['./url-setup.component.scss'],
})
export class UrlSetupComponent {
  currentStep = 1;
  readonly lastStep = 3;

  mihoyoUser!: User | null;
  importedWishes = 0;
  error = '';
  loading = false;

  constructor(
    private _auth: AuthService,
    private _mihoyo: MihoyoService,
    private _gw: GenshinWishesService,
    private _snack: SnackService,
    private _top: TopService,
    private _router: Router
  ) {
    this._top.setTitle('app.urlSetup.title');
  }

  finish(data: AuthUrlAndPersistInfo): void {
    if (this._mihoyo.auth(data)) {
      this.loading = true;

      this.callLinkMihoyoUser(data);
    } else {
      this.error = 'app.urlInput.incorrectLink';
    }
  }

  private callLinkMihoyoUser(data: AuthUrlAndPersistInfo): Promise<void> {
    return this._gw
      .linkMihoyoUser()
      .then((user) => {
        this.mihoyoUser = user;
        this._auth.register(user);
        this._mihoyo.auth(data); // updates mihoyoUid in cookie if revelant
        this._gw.importWishes(true).then((res) => {
          this.loading = false;

          if (res) {
            this.importedWishes = BannerTypes.reduce(
              (prev, curr) => prev + res[curr],
              0
            );
            this.currentStep++;
          } else {
            this.error = 'app.urlInput.incorrectLink';
          }
        });
      })
      .catch((error) => {
        this.loading = false;

        if (error.error === ApiErrors.MIHOYO_UNREACHABLE)
          return this._snack
            .open(
              'generics.mihoyoError$',
              'mihoyo_unreachable',
              'accent',
              'generics.retry'
            )
            .onAction()
            .pipe(
              tap(() => (this.loading = true)),
              exhaustMap(() => from(this.callLinkMihoyoUser(data)))
            )
            .toPromise();

        this.error = 'app.urlInput.incorrectLink';

        return Promise.reject();
      });
  }
}
