import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBannerComponent } from './event-banner.component';

describe('EventBannerComponent', () => {
  let component: EventBannerComponent;
  let fixture: ComponentFixture<EventBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
