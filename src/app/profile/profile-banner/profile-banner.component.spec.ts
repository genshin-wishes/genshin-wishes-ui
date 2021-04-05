import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBannerComponent } from './profile-banner.component';

describe('ProfileBannerComponent', () => {
  let component: ProfileBannerComponent;
  let fixture: ComponentFixture<ProfileBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
