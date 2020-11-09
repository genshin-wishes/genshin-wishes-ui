import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNavComponent } from './banner-nav.component';

describe('BannerNavComponent', () => {
  let component: BannerNavComponent;
  let fixture: ComponentFixture<BannerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerNavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
