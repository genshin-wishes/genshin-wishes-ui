import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-focus-chip',
  templateUrl: './focus-chip.component.html',
  styleUrls: ['./focus-chip.component.scss'],
})
export class FocusChipComponent {
  @Input()
  focused!: boolean;
}
