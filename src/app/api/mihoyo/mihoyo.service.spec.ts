import { TestBed } from '@angular/core/testing';

import { MihoyoService } from './mihoyo.service';

describe('MihoyoService', () => {
  let service: MihoyoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MihoyoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
