import { Component, Input, TemplateRef } from '@angular/core';
import { User } from '../../../api/genshin-wishes/user';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
})
export class EndComponent {
  @Input()
  importedWishes!: number;
  @Input()
  actions!: TemplateRef<any>;
  @Input()
  mihoyoUser!: User;
}
