import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishNoResultComponent } from './wish-no-result.component';

describe('WishNoResultComponent', () => {
  let component: WishNoResultComponent;
  let fixture: ComponentFixture<WishNoResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishNoResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishNoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
