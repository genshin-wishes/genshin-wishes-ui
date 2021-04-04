import { Component, Input } from '@angular/core';
import { TopService } from '../top.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  @Input()
  withLogout!: boolean;
}
