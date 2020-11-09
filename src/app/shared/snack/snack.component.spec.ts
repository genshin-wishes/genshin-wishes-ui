import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackComponent } from './snack.component';

describe('SnackComponent', () => {
  let component: SnackComponent;
  let fixture: ComponentFixture<SnackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
