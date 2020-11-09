import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlDialogComponent } from './url-dialog.component';

describe('UrlDialogComponent', () => {
  let component: UrlDialogComponent;
  let fixture: ComponentFixture<UrlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrlDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
