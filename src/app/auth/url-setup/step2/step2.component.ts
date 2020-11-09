import { Component, ElementRef, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styles: [
    `
      p {
        white-space: pre-wrap;
      }
    `,
  ],
})
export class Step2Component {
  @Input()
  actions!: TemplateRef<ElementRef>;
}
