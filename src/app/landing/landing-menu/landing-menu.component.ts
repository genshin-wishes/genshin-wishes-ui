import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-landing-menu',
  templateUrl: './landing-menu.component.html',
  styleUrls: ['./landing-menu.component.scss'],
})
export class LandingMenuComponent {
  user$ = this._auth.user$;

  constructor(
    public router: Router,
    private _auth: AuthService,
    private _dialogRef: MatDialogRef<LandingMenuComponent>
  ) {}

  close(): void {
    this._dialogRef.close();
  }
}
