import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentUidDialogComponent } from './different-uid-dialog.component';

describe('DifferentUidDialogComponent', () => {
  let component: DifferentUidDialogComponent;
  let fixture: ComponentFixture<DifferentUidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DifferentUidDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentUidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
