import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlSetupComponent } from './url-setup.component';

describe('UrlSetupComponent', () => {
  let component: UrlSetupComponent;
  let fixture: ComponentFixture<UrlSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrlSetupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
