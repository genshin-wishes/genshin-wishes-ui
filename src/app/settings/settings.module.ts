import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [SettingsComponent, DeleteAccountDialogComponent],
  imports: [SharedModule, AuthModule],
})
export class SettingsModule {}
