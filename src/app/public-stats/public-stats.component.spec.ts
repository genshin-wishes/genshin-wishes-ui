import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicStatsComponent } from './public-stats.component';

describe('PublicStatsComponent', () => {
  let component: PublicStatsComponent;
  let fixture: ComponentFixture<PublicStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
