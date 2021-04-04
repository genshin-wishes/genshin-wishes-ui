import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourStarsDetailsComponent } from './four-stars-details.component';

describe('FourStarsDetailsComponent', () => {
  let component: FourStarsDetailsComponent;
  let fixture: ComponentFixture<FourStarsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourStarsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourStarsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
