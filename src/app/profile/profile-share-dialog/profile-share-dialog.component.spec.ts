import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShareDialogComponent } from './profile-share-dialog.component';

describe('ProfileShareDialogComponent', () => {
  let component: ProfileShareDialogComponent;
  let fixture: ComponentFixture<ProfileShareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileShareDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
