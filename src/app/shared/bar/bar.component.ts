import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {
  @Input()
  @HostBinding('style.width.%')
  value!: number;

  @Input()
  color: 'primary' | 'accent' | 'success' = 'primary';
}
