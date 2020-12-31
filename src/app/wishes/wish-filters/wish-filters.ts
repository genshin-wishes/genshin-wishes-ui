import { Params } from '@angular/router';

export class WishFilters {
  freeText?: string;
  ranks: number[] = [];
  itemType?: 'Character' | 'Weapon';

  constructor(params?: Params | WishFilters) {
    if (!params) {
      return;
    }

    this.freeText = params.freeText;
    this.ranks = []
      .concat(params.ranks ? params.ranks : [])
      .map((one: string) => +one);
    this.itemType = params.itemType;
  }

  isEmpty(): boolean {
    return !this.freeText && !this.ranks.length && !this.itemType;
  }

  reset(): void {
    this.freeText = '';
    this.ranks = [];
    this.itemType = undefined;
  }

  addToParams(params: Params): Params {
    if (this.freeText) params.freeText = this.freeText;

    if (this.ranks.length) params.ranks = this.ranks.map((one) => one + '');

    if (this.itemType) params.itemType = this.itemType;

    return params;
  }
}
