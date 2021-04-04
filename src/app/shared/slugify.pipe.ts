import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify',
})
export class SlugifyPipe implements PipeTransform {
  transform(value: string): unknown {
    return value
      .replace(/_/g, '-')
      .replace(/\s/g, '-')
      .replace(/\'/g, '')
      .toLowerCase();
  }
}
