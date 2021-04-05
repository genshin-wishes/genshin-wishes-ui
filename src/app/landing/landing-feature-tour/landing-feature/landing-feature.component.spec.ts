import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFeatureComponent } from './landing-feature.component';

describe('LandingFeatureComponent', () => {
  let component: LandingFeatureComponent;
  let fixture: ComponentFixture<LandingFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
