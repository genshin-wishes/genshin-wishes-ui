import { Component } from '@angular/core';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MihoyoService } from '../../api/mihoyo/mihoyo.service';
import { User } from '../../api/genshin-wishes/user';
import { TopService } from '../../core/top.service';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { SnackService } from '../../shared/snack/snack.service';
import { AuthUrlAndPersistInfo } from '../url-input/url-input.component';
import { ImportResponse } from '../../api/genshin-wishes/import-response';
import { ApiErrors } from '../../api/genshin-wishes/constants';
import { ImportService } from '../../api/genshin-wishes/import.service';

@Component({
  selector: 'app-url-setup',
  templateUrl: './url-setup.component.html',
  styleUrls: ['./url-setup.component.scss'],
})
export class UrlSetupComponent {
  currentStep = 1;
  readonly lastStep = 1;

  mihoyoUser!: User | null;
  importedWishes: ImportResponse = {} as ImportResponse;
  importedWishes$: Observable<ImportResponse> = this._import.importState$.pipe(
    map(
      (importedWishes) =>
        (this.importedWishes = importedWishes || this.importedWishes)
    ),
    catchError((err) => {
      this.currentStep = 1;

      throw err;
    })
  );
  error = '';
  loading = false;

  constructor(
    private _auth: AuthService,
    private _mihoyo: MihoyoService,
    private _gw: GenshinWishesService,
    private _import: ImportService,
    private _snack: SnackService,
    private _top: TopService,
    private _router: Router
  ) {
    this._top.setTitle('app.urlSetup.title');
  }

  finish(data: AuthUrlAndPersistInfo): void {
    if (this._mihoyo.auth(data)) {
      this.loading = true;

      this.callLinkMihoyoUser(data).then(() => ++this.currentStep);
    } else {
      alert('??');
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

        this._import
          .import(true)
          .catch((err) => {
            this.currentStep = 1;

            if (err?.error === ApiErrors.AUTHKEY_INVALID)
              this.error = 'app.urlInput.incorrectLink';
          })
          .finally(() => (this.loading = false));
      })
      .catch((error) => {
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

        if (error?.error === ApiErrors.AUTHKEY_INVALID)
          this.error = 'app.urlInput.incorrectLink';

        return Promise.reject();
      })
      .finally(() => (this.loading = false));
  }
}
