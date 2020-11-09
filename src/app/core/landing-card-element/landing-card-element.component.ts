import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-landing-card-element',
  templateUrl: './landing-card-element.component.html',
  styleUrls: ['./landing-card-element.component.scss'],
})
export class LandingCardElementComponent {
  @Input()
  icon!: IconProp;
  @Input()
  text!: string;
  @Input()
  soon = false;
}
