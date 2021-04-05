import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCommentsComponent } from './landing-comments.component';

describe('LandingCommentsComponent', () => {
  let component: LandingCommentsComponent;
  let fixture: ComponentFixture<LandingCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
