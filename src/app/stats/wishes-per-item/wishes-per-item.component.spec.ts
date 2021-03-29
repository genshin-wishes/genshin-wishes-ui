import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesPerItemComponent } from './wishes-per-item.component';

describe('WishesPerItemComponent', () => {
  let component: WishesPerItemComponent;
  let fixture: ComponentFixture<WishesPerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishesPerItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesPerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
