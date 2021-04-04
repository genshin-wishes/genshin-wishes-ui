import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Banner } from '../../api/banner';

@Component({
  selector: 'app-banner-select',
  templateUrl: './banner-select.component.html',
  styleUrls: ['./banner-select.component.scss'],
})
export class BannerSelectComponent {
  @Output()
  selectedBannersChange = new EventEmitter<number[]>();
  @Input()
  multiple = false;
  @Input()
  banners!: Banner[];
  @Input()
  selectedBanners!: number[];
}
