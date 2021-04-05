import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCountersComponent } from './landing-counters.component';

describe('LandingCountersComponent', () => {
  let component: LandingCountersComponent;
  let fixture: ComponentFixture<LandingCountersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingCountersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
