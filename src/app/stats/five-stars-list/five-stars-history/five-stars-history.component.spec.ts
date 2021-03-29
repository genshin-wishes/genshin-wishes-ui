import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveStarsHistoryComponent } from './five-stars-history.component';

describe('FiveStarsHistoryComponent', () => {
  let component: FiveStarsHistoryComponent;
  let fixture: ComponentFixture<FiveStarsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveStarsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveStarsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
