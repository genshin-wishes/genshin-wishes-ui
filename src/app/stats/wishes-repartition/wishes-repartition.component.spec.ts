import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesRepartitionComponent } from './wishes-repartition.component';

describe('WishesRepartitionComponent', () => {
  let component: WishesRepartitionComponent;
  let fixture: ComponentFixture<WishesRepartitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishesRepartitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesRepartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
