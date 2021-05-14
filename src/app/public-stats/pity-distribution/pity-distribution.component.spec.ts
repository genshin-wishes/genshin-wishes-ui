import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PityDistributionComponent } from './pity-distribution.component';

describe('PityDistributionComponent', () => {
  let component: PityDistributionComponent;
  let fixture: ComponentFixture<PityDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PityDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PityDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
