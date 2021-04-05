import { Component, HostBinding, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-landing-icon',
  templateUrl: './landing-icon.component.html',
  styleUrls: ['./landing-icon.component.scss'],
})
export class LandingIconComponent {
  @Input()
  icon!: IconProp | undefined;
  @Input()
  subIcon!: IconProp;
  @Input()
  @HostBinding('class.active')
  active!: boolean;
}
