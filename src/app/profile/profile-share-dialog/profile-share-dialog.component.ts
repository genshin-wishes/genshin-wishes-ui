import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackService } from '../../shared/snack/snack.service';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../auth/auth.service';
import { exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-share-dialog',
  templateUrl: './profile-share-dialog.component.html',
  styleUrls: ['./profile-share-dialog.component.scss'],
})
export class ProfileShareDialogComponent {
  profileUrl = this.buildUrl(this._auth.getCurrentUser()?.profileId);
  sharing = this._auth.getCurrentUser()?.sharing;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _profile: ProfileService,
    private _snack: SnackService
  ) {}

  share(share: boolean): Promise<void> {
    this.sharing = share;

    return this._profile
      .updateSharing(share)
      .then((profileId) => {
        this.sharing = share;
        this.profileUrl = this.buildUrl(profileId);
      })
      .catch(() => {
        this.sharing = !share;

        return this._snack
          .open(
            'generics.error$',
            'profile_share_error',
            'accent',
            'generics.retry'
          )
          .onAction()
          .pipe(exhaustMap(() => this.share(share)))
          .toPromise();
      });
  }

  copied(): void {
    this._snack.open('profile.share.success$', 'profile_share_copy');
  }

  private buildUrl(profileId: string | undefined): string {
    return !profileId
      ? ''
      : new URL(window.location.href).origin +
          this._router.createUrlTree(['/profile', profileId]).toString();
  }
}
