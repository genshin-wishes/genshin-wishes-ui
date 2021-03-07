import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { AuthModule } from '../auth/auth.module';
import { ExportWishesDialogComponent } from './export-wishes-dialog/export-wishes-dialog.component';

@NgModule({
  declarations: [
    SettingsComponent,
    DeleteAccountDialogComponent,
    ExportWishesDialogComponent,
  ],
  imports: [SharedModule, AuthModule],
})
export class SettingsModule {}
