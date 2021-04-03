import { Component, Input, TemplateRef } from '@angular/core';
import { ImportResponse } from '../../../api/genshin-wishes/import-response';
import { BannerTypes } from '../../../api/genshin-wishes/constants';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
})
export class EndComponent {
  @Input()
  importedWishes!: ImportResponse;
  @Input()
  actions!: TemplateRef<unknown>;

  banners = BannerTypes;
}
