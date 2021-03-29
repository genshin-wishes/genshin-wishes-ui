import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSelectComponent } from './banner-select.component';

describe('EventSelectComponent', () => {
  let component: BannerSelectComponent;
  let fixture: ComponentFixture<BannerSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
