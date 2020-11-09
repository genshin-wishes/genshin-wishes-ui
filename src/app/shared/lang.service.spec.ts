import { TestBed } from '@angular/core/testing';

import { LangService } from './lang.service';

describe('LangService', () => {
  let service: LangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
