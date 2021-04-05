import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing-footer-banner',
  templateUrl: './landing-footer-banner.component.html',
  styleUrls: ['./landing-footer-banner.component.scss'],
})
export class LandingFooterBannerComponent {
  discordUrl = environment.discord;
}
