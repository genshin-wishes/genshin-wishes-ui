import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { interval, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-landing-feature-tour',
  templateUrl: './landing-feature-tour.component.html',
  styleUrls: ['./landing-feature-tour.component.scss'],
})
export class LandingFeatureTourComponent implements OnInit, OnDestroy {
  features: {
    icon?: IconProp;
    img: string;
    description: string;
  }[] = [
    {
      icon: 'chart-pie',
      img: 'stats.png',
      description: 'landing.feature.personalStats',
    },
    {
      icon: 'chart-bar',
      img: 'global-stats.png',
      description: 'landing.feature.globalStats',
    },
    {
      img: 'pity.png',
      description: 'landing.feature.dashboard',
    },
    {
      icon: 'archive',
      img: 'archive.png',
      description: 'landing.feature.archive',
    },
    {
      icon: 'laptop-house',
      img: 'setup.png',
      description: 'landing.feature.platforms',
    },
  ];

  current = 0;
  progress = 0;

  private _destroy = new Subject();
  reset$ = new Subject();

  constructor(private _cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.reset$
      .pipe(
        tap(() => (this.progress = 0)),
        startWith(null),
        switchMap(() => interval(100)),
        map(() => (this.progress += 1)),
        takeUntil(this._destroy)
      )
      .subscribe((progress) => {
        if (progress >= 100) {
          this.progress = 0;
          this.current++;
          if (this.current >= this.features.length) this.current = 0;
          this._cd.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
