import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { BannerType, BannerTypes } from '../../../api/genshin-wishes/constants';
import * as Flickity from 'flickity';
import { Banner } from '../../../api/banner';

@Component({
  selector: 'app-banner-nav',
  templateUrl: './banner-nav.component.html',
  styleUrls: ['./banner-nav.component.scss'],
})
export class BannerNavComponent implements OnInit, AfterViewInit {
  @ViewChild(MatMenuTrigger)
  menuTrigger!: MatMenuTrigger;

  @Output()
  filter = new EventEmitter<void>();

  @Input()
  allFirst = false;
  @Input()
  withFilters = true;
  @Input()
  mode: 'normal' | 'card' = 'normal';
  @Input()
  current!: BannerType;

  banners: string[] = [...BannerTypes];

  ngOnInit(): void {
    this.banners = (this.allFirst
      ? [BannerType.ALL, ...BannerTypes]
      : [...BannerTypes, 'ALL']
    ).filter((b) => b !== this.current);
  }

  ngAfterViewInit(): void {
    if (this.mode === 'card') {
      const flickity = new Flickity('.banners-nav', {
        prevNextButtons: false,
        percentPosition: false,
        groupCells: true,
        draggable: true,
        cellAlign: 'center',
        pageDots: false,
      });

      flickity.on('dragStart', () =>
        flickity.slider.childNodes.forEach(
          (slide) =>
            (((slide as unknown) as {
              style: { pointerEvents: string };
            }).style.pointerEvents = 'none')
        )
      );
      flickity.on('dragEnd', () =>
        flickity.slider.childNodes.forEach(
          (slide) =>
            (((slide as unknown) as {
              style: { pointerEvents: string };
            }).style.pointerEvents = 'all')
        )
      );
    }
  }
}
