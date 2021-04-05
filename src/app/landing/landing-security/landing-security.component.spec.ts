import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSecurityComponent } from './landing-security.component';

describe('LandingSecurityComponent', () => {
  let component: LandingSecurityComponent;
  let fixture: ComponentFixture<LandingSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
