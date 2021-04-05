import { Component, Input } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { TopService } from '../top.service';
import { ImportService } from '../../api/genshin-wishes/import.service';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProfileShareDialogComponent } from '../../profile/profile-share-dialog/profile-share-dialog.component';

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

  importState$ = this._import.importState$;

  isSettings$ = this._router.events.pipe(
    startWith(new NavigationEnd(0, this._router.url, '')),
    filter((e) => e instanceof NavigationEnd),
    map((event) => (event as NavigationEnd).url.includes('/settings'))
  );

  isStats$ = this._router.events.pipe(
    startWith(new NavigationEnd(0, this._router.url, '')),
    filter((e) => e instanceof NavigationEnd),
    map((event) => (event as NavigationEnd).url.includes('/stats'))
  );

  constructor(
    private _router: Router,
    private _sidenav: SidenavService,
    private _top: TopService,
    private _dialog: MatDialog,
    private _import: ImportService
  ) {}

  toggle(): void {
    this._sidenav.toggle();
  }

  importWishes(): void {
    this._import.import().catch(() => {});
  }

  share(): void {
    this._dialog.open(ProfileShareDialogComponent);
  }
}
