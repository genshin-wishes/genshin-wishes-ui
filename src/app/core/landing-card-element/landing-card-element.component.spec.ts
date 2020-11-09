import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCardElementComponent } from './landing-card-element.component';

describe('LandingCardElementComponent', () => {
  let component: LandingCardElementComponent;
  let fixture: ComponentFixture<LandingCardElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingCardElementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCardElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
