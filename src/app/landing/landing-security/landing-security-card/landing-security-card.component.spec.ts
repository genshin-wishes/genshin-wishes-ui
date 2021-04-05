import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSecurityCardComponent } from './landing-security-card.component';

describe('LandingSecurityCardComponent', () => {
  let component: LandingSecurityCardComponent;
  let fixture: ComponentFixture<LandingSecurityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingSecurityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSecurityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
