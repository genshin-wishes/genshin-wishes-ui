import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from './snack.component';
import { TranslateService } from '@ngx-translate/core';

export interface SnackData {
  messages: {
    message: string;
    title?: string;
    translated?: boolean;
  }[];
  ga: string;
  emoji?: string;
  action?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(
    private _snack: MatSnackBar,
    private _translate: TranslateService
  ) {}

  open(
    key: string,
    gaClick: string,
    color?: 'primary' | 'accent' | 'warn',
    action?: string
  ) {
    color = color || 'primary';

    return this._snack.openFromComponent(SnackComponent, {
      data: {
        messages: [{ message: key + '.message', title: key + '.title' }],
        emoji: key + '.emoji',
        ga: gaClick,
        action,
      } as SnackData,
      panelClass: 'mat-' + color,
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  openMulti(
    messages: {
      message: string;
      title?: string;
    }[],
    gaClick: string,
    emoji?: string,
    color?: 'primary' | 'accent' | 'warn'
  ) {
    color = color || 'primary';

    return this._snack.openFromComponent(SnackComponent, {
      data: {
        messages,
        ga: gaClick,
        emoji,
      } as SnackData,
      panelClass: 'mat-' + color,
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
