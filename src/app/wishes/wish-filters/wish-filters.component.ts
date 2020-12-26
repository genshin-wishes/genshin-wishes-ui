import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { Moment } from 'moment/moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, map, skip } from 'rxjs/operators';

export interface WishFilters {
  freeText?: string;
  fr?: boolean;
  ranks: number[];
  itemType?: 'Character' | 'Weapon';
  startDate?: Moment;
  endDate?: Moment;
}

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
  private _filtersChange = new EventEmitter<WishFilters>();

  @Output()
  filtersChange = this._filtersChange.pipe(
    debounceTime(400),
    map((filters) => filters)
  );
  @Input()
  filters: WishFilters = {
    ranks: [],
  };

  ranks = [Array(3).fill(0), Array(4).fill(0), Array(5).fill(0)];
  itemTypes: ['Character', 'Weapon'] = ['Character', 'Weapon'];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) data: WishFiltersDialogData
  ) {
    if (data) {
      this.filters = data.filters;
      this.filtersChange
        .pipe(skip(4)) // 3 change in template + this one
        .subscribe(data.filtersChange);
    }
  }

  onChange() {
    this._filtersChange.emit({ ...this.filters });
  }
}

/**
 * TODO
 * - Design filters (dont rendre carré bouton loupe)
 * - Filters en mode popup
 * - Trads Character Weapon etc
 * - Le infinite scroll qui marche pas ouf
 */
