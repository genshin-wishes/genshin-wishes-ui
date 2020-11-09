import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { AuthUrlAndPersistInfo } from '../../url-input/url-input.component';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component {
  @Input()
  feedback!: string;
  @Input()
  actions!: TemplateRef<ElementRef>;

  @Output()
  finish = new EventEmitter<AuthUrlAndPersistInfo>();

  mihoyoUrl!: AuthUrlAndPersistInfo;
}
