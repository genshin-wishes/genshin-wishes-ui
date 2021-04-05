import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingIconComponent } from './landing-icon.component';

describe('LandingIconComponent', () => {
  let component: LandingIconComponent;
  let fixture: ComponentFixture<LandingIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
