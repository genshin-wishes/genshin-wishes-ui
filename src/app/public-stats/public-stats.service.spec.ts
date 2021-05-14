import { TestBed } from '@angular/core/testing';

import { PublicStatsService } from './public-stats.service';

describe('PublicStatsService', () => {
  let service: PublicStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
