import { Component, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LangService } from '../../shared/lang.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Output()
  nav = new EventEmitter();

  discordUrl = environment.discord;
  typeformUrl$ = this._lang.lang$.pipe(
    map((lang) =>
      lang === 'fr' ? environment.typeform.fr : environment.typeform.en
    )
  );
  coffeeUrl = environment.coffee;

  constructor(private _lang: LangService) {}
}
