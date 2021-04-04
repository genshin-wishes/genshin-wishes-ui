import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCardComponent } from './landing-card.component';

describe('LandingCardComponent', () => {
  let component: LandingCardComponent;
  let fixture: ComponentFixture<LandingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
