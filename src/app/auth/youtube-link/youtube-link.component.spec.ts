import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeLinkComponent } from './youtube-link.component';

describe('YoutubeLinkComponent', () => {
  let component: YoutubeLinkComponent;
  let fixture: ComponentFixture<YoutubeLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YoutubeLinkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
