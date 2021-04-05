import { Component, Inject, Input, OnDestroy, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { WishFilters } from './wish-filters';
import { ActivatedRoute, Router } from '@angular/router';
import { GenshinWishesService } from '../../../api/genshin-wishes/genshin-wishes.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { BannerType } from '../../../api/genshin-wishes/constants';

export interface WishFiltersDialogData {
  route: ActivatedRoute;
  banner: BannerType;
  filters: WishFilters;
  filtersChange: Subject<WishFilters>;
}

@Component({
  selector: 'app-wish-filters',
  templateUrl: './wish-filters.component.html',
  styleUrls: ['./wish-filters.component.scss'],
})
export class WishFiltersComponent implements OnDestroy {
  @Input()
  filters: WishFilters = new WishFilters();

  @Input()
  banner!: BannerType;

  @Input()
  route!: ActivatedRoute;

  ranks = [Array(3).fill(0), Array(4).fill(0), Array(5).fill(0)];
  itemTypes: ['Character', 'Weapon'] = ['Character', 'Weapon'];

  characterEvents$ = this._gw.getCharacterEvents();
  weaponEvents$ = this._gw.getWeaponEvents();

  BannerType = BannerType;

  private destroy = new Subject();

  changes = new Subject();
  freeTextChanges = new Subject();

  constructor(
    private _gw: GenshinWishesService,
    private _router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WishFiltersDialogData
  ) {
    if (data) {
      this.banner = data.banner;
      this.filters = data.filters;
      this.route = data.route;
    }

    this.freeTextChanges
      .pipe(debounceTime(400), takeUntil(this.destroy))
      .subscribe(this.changes);

    this.changes.pipe(takeUntil(this.destroy)).subscribe(() => {
      this._router.navigate(['.'], {
        queryParams: this.filters.addToParams({}),
        relativeTo: this.route,
      });
    });
  }

  resetFilters(): void {
    this.filters.reset();
    this.changes.next();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
