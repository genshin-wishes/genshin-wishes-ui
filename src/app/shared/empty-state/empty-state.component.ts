import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
  @Input()
  header!: string;
  @Input()
  description!: string;
  @Input()
  buttonLink!: unknown[] | string | null | undefined;
  @Input()
  buttonIcon!: IconProp;
  @Input()
  buttonLabel!: string;
}
