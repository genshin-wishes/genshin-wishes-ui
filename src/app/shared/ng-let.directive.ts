import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngLet]',
})
export class NgLetDirective {
  @Input()
  set ngLet(value: unknown) {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.template, {
      $implicit: value,
      ngLet: value,
    });
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<unknown>
  ) {}
}
