import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishFiltersComponent } from './wish-filters.component';

describe('WishFiltersComponent', () => {
  let component: WishFiltersComponent;
  let fixture: ComponentFixture<WishFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
