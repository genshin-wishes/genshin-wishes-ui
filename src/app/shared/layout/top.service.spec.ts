import { TestBed } from '@angular/core/testing';

import { TopService } from './top.service';

describe('TopService', () => {
  let service: TopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
