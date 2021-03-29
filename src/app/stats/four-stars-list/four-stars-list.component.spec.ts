import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourStarsListComponent } from './four-stars-list.component';

describe('FourStarsListComponent', () => {
  let component: FourStarsListComponent;
  let fixture: ComponentFixture<FourStarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourStarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourStarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
