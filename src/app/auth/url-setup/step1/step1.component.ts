import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styles: [
    `
      p {
        white-space: pre-wrap;
      }
    `,
  ],
})
export class Step1Component {
  @Input()
  actions!: TemplateRef<any>;
}
