import { Component, Input, EventEmitter, Output } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-locale-select',
  templateUrl: './locale-select.component.html',
  styleUrls: ['./locale-select.component.scss'],
})
export class LocaleSelectComponent {
  @Input()
  value!: string;
  @Output()
  valueChange = new EventEmitter<string>();
  @Input()
  namesOnlyForWide!: boolean;

  locales = this._lang.locales;
  localeToLanguage$ = this._lang.getLanguages().pipe(shareReplay(1));

  constructor(private _lang: LangService) {}
}
