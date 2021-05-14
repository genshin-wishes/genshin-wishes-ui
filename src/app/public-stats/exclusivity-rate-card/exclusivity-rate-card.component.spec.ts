import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusivityRateCardComponent } from './exclusivity-rate-card.component';

describe('ExclusivityRateCardComponent', () => {
  let component: ExclusivityRateCardComponent;
  let fixture: ComponentFixture<ExclusivityRateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusivityRateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusivityRateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
