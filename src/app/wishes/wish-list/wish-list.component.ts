import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Wish } from '../../api/genshin-wishes/wish';
import { VirtualScrollDatasource } from '../virtual-scroll-datasource';
import { map } from 'rxjs/operators';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent {
  @Output()
  removeFilters = new EventEmitter<void>();
  @Input()
  count!: number | undefined | null;
  @Input()
  wishes$!: Observable<VirtualScrollDatasource<Wish>>; // Observable otherwise the DS does not refresh well
  @Input()
  filtering = false;

  itemSize$ = this._mediaObserver
    .asObservable()
    .pipe(map(() => (this._mediaObserver.isActive('lt-sm') ? 86 : 65)));

  constructor(private _mediaObserver: MediaObserver) {}
}
