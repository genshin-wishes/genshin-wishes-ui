import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportWishesDialogComponent } from './export-wishes-dialog.component';

describe('ExportWishesDialogComponent', () => {
  let component: ExportWishesDialogComponent;
  let fixture: ComponentFixture<ExportWishesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportWishesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportWishesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
