import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerRegionComponent } from './users-per-region.component';

describe('UsersPerRegionComponent', () => {
  let component: UsersPerRegionComponent;
  let fixture: ComponentFixture<UsersPerRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersPerRegionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPerRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
