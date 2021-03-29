import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishDistributionComponent } from './wish-distribution.component';

describe('WishDistributionComponent', () => {
  let component: WishDistributionComponent;
  let fixture: ComponentFixture<WishDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
