import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFeatureTourComponent } from './landing-feature-tour.component';

describe('LandingFeatureTourComponent', () => {
  let component: LandingFeatureTourComponent;
  let fixture: ComponentFixture<LandingFeatureTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingFeatureTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingFeatureTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
