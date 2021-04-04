import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankDistributionComponent } from './rank-distribution.component';

describe('RankDistributionComponent', () => {
  let component: RankDistributionComponent;
  let fixture: ComponentFixture<RankDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
