import { TestBed } from '@angular/core/testing';

import { NotAuthGuard } from './not-auth.guard';

describe('NotAuthGuard', () => {
  let guard: NotAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
