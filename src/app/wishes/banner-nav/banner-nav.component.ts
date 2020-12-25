import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { BannerTypes } from '../../api/genshin-wishes/genshin-wishes.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-banner-nav',
  templateUrl: './banner-nav.component.html',
  styleUrls: ['./banner-nav.component.scss'],
})
export class BannerNavComponent {
  @ViewChild(MatMenuTrigger)
  menuTrigger!: MatMenuTrigger;

  @Output()
  filter = new EventEmitter<void>();

  @Input()
  dropdownMode = false;

  banners = BannerTypes;
}
