import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-wish-no-result',
  templateUrl: './wish-no-result.component.html',
  styleUrls: ['./wish-no-result.component.scss'],
})
export class WishNoResultComponent {
  @Output()
  removeFilters = new EventEmitter<void>();
}
