import { Component, Input } from '@angular/core';
import { ImportResponse } from '../../api/genshin-wishes/import-response';
import { BannerTypes } from '../../api/genshin-wishes/constants';

@Component({
  selector: 'app-wish-import-progress',
  templateUrl: './wish-import-progress.component.html',
  styleUrls: ['./wish-import-progress.component.scss'],
})
export class WishImportProgressComponent {
  @Input()
  importedWishes!: ImportResponse;
  @Input()
  saved!: boolean;

  banners = BannerTypes;

  isFinished(importedWishes: ImportResponse): boolean {
    return (
      !!importedWishes &&
      !BannerTypes.find(
        (b) => !importedWishes[b] || !importedWishes[b].finished
      )
    );
  }

  isSaved(importedWishes: ImportResponse): boolean {
    return (
      !!importedWishes &&
      !BannerTypes.find((b) => !importedWishes[b] || !importedWishes[b].saved)
    );
  }
}
