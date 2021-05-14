import { AfterViewInit, Component, Input } from '@angular/core';
import { Banner } from '../../api/banner';
import * as Flickity from 'flickity';
import { CountPerItemId } from '../public-stats';
import { BannerToId, BannerType } from '../../api/genshin-wishes/constants';

@Component({
  selector: 'app-latest-events-banner',
  templateUrl: './latest-events-banner.component.html',
  styleUrls: ['./latest-events-banner.component.scss'],
})
export class LatestEventsBannerComponent implements AfterViewInit {
  @Input()
  latestEvents!: {
    event: Banner;
    count: number;
    itemIdToCount: CountPerItemId[];
  }[];

  BannerType = BannerType;
  BannerToId = BannerToId;

  ngAfterViewInit(): void {
    const flickity = new Flickity('.latest-events', {
      prevNextButtons: false,
      percentPosition: true,
      groupCells: true,
      draggable: true,
      cellAlign: 'left',
      contain: false,
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
