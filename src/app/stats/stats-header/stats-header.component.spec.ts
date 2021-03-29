import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsHeaderComponent } from './stats-header.component';

describe('StatsHeaderComponent', () => {
  let component: StatsHeaderComponent;
  let fixture: ComponentFixture<StatsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
