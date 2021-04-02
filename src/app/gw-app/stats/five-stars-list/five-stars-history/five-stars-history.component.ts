import { Component, Input } from '@angular/core';
import { FiveStarDetail } from '../five-stars-list.component';
import { Wish } from '../../../../api/genshin-wishes/wish';

@Component({
  selector: 'app-five-stars-history',
  templateUrl: './five-stars-history.component.html',
  styleUrls: ['./five-stars-history.component.scss'],
})
export class FiveStarsHistoryComponent {
  @Input()
  detail!: FiveStarDetail;
}
