import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, map, skip } from 'rxjs/operators';
import { WishFilters } from './wish-filters';
import { ActivatedRoute, Router } from '@angular/router';

export interface WishFiltersDialogData {
  filters: WishFilters;
  filtersChange: Subject<WishFilters>;
}

@Component({
  selector: 'app-wish-filters',
  templateUrl: './wish-filters.component.html',
  styleUrls: ['./wish-filters.component.scss'],
})
export class WishFiltersComponent {
  @Input()
  filters: WishFilters = new WishFilters();

  ranks = [Array(3).fill(0), Array(4).fill(0), Array(5).fill(0)];
  itemTypes: ['Character', 'Weapon'] = ['Character', 'Weapon'];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) data: WishFiltersDialogData
  ) {
    if (data) this.filters = data.filters;
  }

  onChange(): void {
    this._router.navigate(['.'], {
      queryParams: this.filters.addToParams({}),
      relativeTo: this._route,
    });
  }

  resetFilters(): void {
    this.filters.reset();
    this.onChange();
  }
}
