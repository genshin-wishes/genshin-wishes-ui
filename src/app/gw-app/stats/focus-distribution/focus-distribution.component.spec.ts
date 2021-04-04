import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusDistributionComponent } from './focus-distribution.component';

describe('FocusDistributionComponent', () => {
  let component: FocusDistributionComponent;
  let fixture: ComponentFixture<FocusDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
