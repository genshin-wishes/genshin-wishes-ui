import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusChipComponent } from './focus-chip.component';

describe('FocusChipComponent', () => {
  let component: FocusChipComponent;
  let fixture: ComponentFixture<FocusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
