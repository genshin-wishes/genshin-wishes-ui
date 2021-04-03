import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishImportProgressComponent } from './wish-import-progress.component';

describe('WishImportProgressComponent', () => {
  let component: WishImportProgressComponent;
  let fixture: ComponentFixture<WishImportProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishImportProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishImportProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
