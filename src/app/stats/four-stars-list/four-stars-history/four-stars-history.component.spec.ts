import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourStarsHistoryComponent } from './four-stars-history.component';

describe('FourStarsHistoryComponent', () => {
  let component: FourStarsHistoryComponent;
  let fixture: ComponentFixture<FourStarsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourStarsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourStarsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
