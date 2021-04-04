import { Component, Input } from '@angular/core';
import { FourStarDetail } from '../four-stars-list.component';

@Component({
  selector: 'app-four-stars-history',
  templateUrl: './four-stars-history.component.html',
  styleUrls: ['./four-stars-history.component.scss'],
})
export class FourStarsHistoryComponent {
  @Input()
  detail!: FourStarDetail;
}
