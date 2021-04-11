import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Output()
  nav = new EventEmitter();

  discordUrl = environment.discord;
  typeformUrl = environment.typeform;
  coffeeUrl = environment.coffee;
  i18nUrl = environment.i18n;
}
