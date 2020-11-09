import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishEmptyComponent } from './wish-empty.component';

describe('WishEmptyComponent', () => {
  let component: WishEmptyComponent;
  let fixture: ComponentFixture<WishEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishEmptyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
