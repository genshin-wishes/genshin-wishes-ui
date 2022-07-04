import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';
import { DifferentUidDialogComponent } from './different-uid-dialog/different-uid-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [AuthComponent, LogoutComponent, DifferentUidDialogComponent],
  imports: [SharedModule, CoreModule, TranslateModule],
  exports: [],
})
export class AuthModule {}
