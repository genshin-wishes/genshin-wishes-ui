import { TestBed } from '@angular/core/testing';

import { GenshinWishesService } from './genshin-wishes.service';

describe('GenshinWishesService', () => {
  let service: GenshinWishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenshinWishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
