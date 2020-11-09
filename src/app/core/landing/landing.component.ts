import { Component, Input } from '@angular/core';
import { TopService } from '../../shared/layout/top.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  @Input()
  withLogout!: boolean;

  constructor(private _top: TopService) {
    this._top.setTitle(null);
  }
}
