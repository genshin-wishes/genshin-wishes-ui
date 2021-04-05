import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-landing-security-card',
  templateUrl: './landing-security-card.component.html',
  styleUrls: ['./landing-security-card.component.scss'],
})
export class LandingSecurityCardComponent {
  @Input()
  icon!: IconProp;
  @Input()
  subIcon!: IconProp;
  @Input()
  description!: string;
}
