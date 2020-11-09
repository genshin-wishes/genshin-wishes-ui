import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/confirm-dialog/confirm-dialog.component';
import { GenshinWishesService } from '../../api/genshin-wishes/genshin-wishes.service';

@Component({
  selector: 'app-different-uid-dialog',
  templateUrl: './different-uid-dialog.component.html',
  styleUrls: ['./different-uid-dialog.component.scss'],
})
export class DifferentUidDialogComponent {
  constructor(
    private _dialogRef: MatDialogRef<DifferentUidDialogComponent>,
    private _dialog: MatDialog
  ) {}

  delete() {
    this._dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'wishes.deletion.title',
          description: 'wishes.deletion.description',
          confirm: 'wishes.deletion.ok',
        } as ConfirmDialogData,
      })
      .afterClosed()
      .toPromise()
      .then((res) => !!res && this._dialogRef.close(res));
  }
}
