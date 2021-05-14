import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesPerRegionComponent } from './wishes-per-region.component';

describe('WishesPerRegionComponent', () => {
  let component: WishesPerRegionComponent;
  let fixture: ComponentFixture<WishesPerRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishesPerRegionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesPerRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
