import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishCardComponent } from './wish-card.component';

describe('WishCardComponent', () => {
  let component: WishCardComponent;
  let fixture: ComponentFixture<WishCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
