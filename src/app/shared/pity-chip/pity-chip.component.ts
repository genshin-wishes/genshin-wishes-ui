import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pity-chip',
  templateUrl: './pity-chip.component.html',
  styleUrls: ['./pity-chip.component.scss'],
})
export class PityChipComponent {
  @Input()
  harmonizedPity!: number;
  @Input()
  pity!: number;
}
