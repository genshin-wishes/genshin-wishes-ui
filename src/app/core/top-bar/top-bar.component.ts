import { Component, Input } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { TopService } from '../top.service';
import { ImportService } from '../../api/genshin-wishes/import.service';

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

  constructor(
    private _sidenav: SidenavService,
    private _top: TopService,
    private _import: ImportService
  ) {}

  toggle(): void {
    this._sidenav.toggle();
  }

  importWishes(): void {
    this._import.import().catch(() => {});
  }
}
