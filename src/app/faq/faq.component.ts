import { Component } from '@angular/core';
import { LangService } from '../shared/lang.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  file$ = this._lang.lang$.pipe(map((lang) => `assets/faq/faq-${lang}.md`));

  ready = false;

  constructor(private _lang: LangService) {}
}
