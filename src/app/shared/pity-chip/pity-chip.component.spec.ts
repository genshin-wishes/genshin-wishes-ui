import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PityChipComponent } from './pity-chip.component';

describe('PityChipComponent', () => {
  let component: PityChipComponent;
  let fixture: ComponentFixture<PityChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PityChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PityChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
