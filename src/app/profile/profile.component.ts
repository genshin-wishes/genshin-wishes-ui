import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, first, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TopService } from '../core/top.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  username$: Observable<string> = this._route.params.pipe(
    switchMap((params) => this._profile.getUsername(params.profileId)),
    catchError(() => of('')),
    shareReplay(1)
  );

  constructor(
    private _top: TopService,
    private _route: ActivatedRoute,
    private _profile: ProfileService
  ) {
    this.username$
      .pipe(first())
      .subscribe((username) => this._top.setTitle(username, true));
  }
}
