import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestEventsBannerComponent } from './latest-events-banner.component';

describe('LatestEventsBannerComponent', () => {
  let component: LatestEventsBannerComponent;
  let fixture: ComponentFixture<LatestEventsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestEventsBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestEventsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
