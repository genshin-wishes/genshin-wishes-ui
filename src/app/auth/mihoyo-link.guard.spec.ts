import { TestBed } from '@angular/core/testing';

import { MihoyoLinkGuard } from './mihoyo-link.guard';

describe('MihoyoLinkGuard', () => {
  let guard: MihoyoLinkGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MihoyoLinkGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
