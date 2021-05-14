import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountPerBannerComponent } from './count-per-banner.component';

describe('CountPerBannerComponent', () => {
  let component: CountPerBannerComponent;
  let fixture: ComponentFixture<CountPerBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountPerBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountPerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
