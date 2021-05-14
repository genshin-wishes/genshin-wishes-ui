import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-wish-no-result',
  templateUrl: './wish-no-result.component.html',
  styleUrls: ['./wish-no-result.component.scss'],
})
export class WishNoResultComponent {
  @Output()
  removeFilters = new EventEmitter<void>();

  @Input()
  titleKey = 'wishes.noResult.title';
  @Input()
  descriptionKey = 'wishes.noResult.message';
  @Input()
  resetKey = 'wishes.filters.reset';
}
