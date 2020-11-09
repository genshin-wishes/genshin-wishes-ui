import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCardComponent } from './banner-card.component';

describe('BannerCardComponent', () => {
  let component: BannerCardComponent;
  let fixture: ComponentFixture<BannerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
