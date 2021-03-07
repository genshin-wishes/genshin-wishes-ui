import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  discordUrl = environment.discord;
  typeformUrl = environment.typeform;
  coffeeUrl = environment.coffee;
}
