import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.scss'],
})
export class ProfileBannerComponent {
  @Input()
  username!: string | null;
}
