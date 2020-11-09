import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent {
  @Input()
  stepTitle!: string;
  @Input()
  stepSubtitle!: string;
  @Input()
  actions!: TemplateRef<any>;

  constructor() {}
}
