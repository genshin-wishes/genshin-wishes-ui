import { Component } from '@angular/core';
import { AuthUrlAndPersistInfo } from '../url-input/url-input.component';

@Component({
  selector: 'app-url-dialog',
  templateUrl: './url-dialog.component.html',
  styleUrls: ['./url-dialog.component.scss'],
})
export class UrlDialogComponent {
  authUrl!: AuthUrlAndPersistInfo;
}
