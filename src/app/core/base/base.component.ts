import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { AuthService } from '../../auth/auth.service';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;

  destroy = new Subject();

  user$ = this._auth.user$;

  randomItem$ = this._gw.getItems().pipe(
    map((items) => items.filter((item) => item.itemType === 'Character')),
    map((items) => items[Math.floor(Math.random() * items.length)])
  );

  constructor(
    private _sidenav: SidenavService,
    private _gw: GenshinWishesService,
    private _auth: AuthService,
    private _mediaObserver: MediaObserver
  ) {}

  ngAfterViewInit(): void {
    this._sidenav.toggle$
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.sidenav && this.sidenav.toggle());

    this._mediaObserver
      .asObservable()
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        if (!this.sidenav) {
          return;
        }

        if (this._mediaObserver.isActive('gt-md')) {
          this.sidenav.mode = 'side';
          this.sidenav.opened = true;
        } else {
          this.sidenav.mode = 'over';
          this.sidenav.opened = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
