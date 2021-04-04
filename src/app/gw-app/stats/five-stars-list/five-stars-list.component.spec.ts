import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveStarsListComponent } from './five-stars-list.component';

describe('FiveStarsListComponent', () => {
  let component: FiveStarsListComponent;
  let fixture: ComponentFixture<FiveStarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveStarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveStarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
