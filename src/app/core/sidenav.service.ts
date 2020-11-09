import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _toggle$ = new Subject();
  readonly toggle$ = this._toggle$.asObservable();

  toggle() {
    this._toggle$.next();
  }
}
