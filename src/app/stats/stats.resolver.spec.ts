import { TestBed } from '@angular/core/testing';

import { StatsResolver } from './stats.resolver';

describe('StatsResolver', () => {
  let resolver: StatsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StatsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
