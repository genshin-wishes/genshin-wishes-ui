import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PityDistributionCardComponent } from './pity-distribution-card.component';

describe('PityDistributionCardComponent', () => {
  let component: PityDistributionCardComponent;
  let fixture: ComponentFixture<PityDistributionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PityDistributionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PityDistributionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
