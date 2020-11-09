import { AfterViewInit, Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackData } from './snack.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss'],
})
export class SnackComponent implements AfterViewInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackData,
    private _snackBarRef: MatSnackBarRef<SnackComponent>,
    private _ga: GoogleAnalyticsService
  ) {}

  ngAfterViewInit(): void {
    this._ga.event(this.data.ga);
  }

  action(): void {
    this._snackBarRef.dismissWithAction();
  }
}
