import { Component, Input } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { TopService } from '../top.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProfileShareDialogComponent } from '../../profile/profile-share-dialog/profile-share-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/confirm-dialog/confirm-dialog.component';

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

  title$ = this._top.title$;

  routing$ = this._router.events.pipe(
    startWith(new NavigationEnd(0, this._router.url, '')),
    filter((e) => e instanceof NavigationEnd),
    shareReplay(1)
  );

  noAction$ = this.routing$.pipe(
    map(
      (event) =>
        (event as NavigationEnd).url.includes('/settings') ||
        (event as NavigationEnd).url.includes('/faq')
    )
  );

  isStats$ = this.routing$.pipe(
    map((event) => (event as NavigationEnd).url.includes('/stats'))
  );

  constructor(
    private _router: Router,
    private _sidenav: SidenavService,
    private _top: TopService,
    private _dialog: MatDialog
  ) {}

  toggle(): void {
    this._sidenav.toggle();
  }

  share(): void {
    this._dialog.open(ProfileShareDialogComponent);
  }

  exportWishes(): void {
    this._dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'settings.export.confirm.title',
          description: 'settings.export.confirm.description',
          confirm: 'settings.export.action',
          color: 'accent',
        } as ConfirmDialogData,
      })
      .afterClosed()
      .toPromise()
      .then((res) => !!res && window.open('/api/wishes/export'));
  }
}
