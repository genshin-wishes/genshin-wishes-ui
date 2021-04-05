import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFooterBannerComponent } from './landing-footer-banner.component';

describe('LandingFooterBannerComponent', () => {
  let component: LandingFooterBannerComponent;
  let fixture: ComponentFixture<LandingFooterBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingFooterBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingFooterBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
