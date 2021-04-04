import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerActivityComponent } from './banner-activity.component';

describe('BannerActivityComponent', () => {
  let component: BannerActivityComponent;
  let fixture: ComponentFixture<BannerActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
