import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';
import { UrlDialogComponent } from './url-dialog/url-dialog.component';
import { LandingModule } from '../core/landing/landing.module';
import { UrlSetupComponent } from './url-setup/url-setup.component';
import { DifferentUidDialogComponent } from './different-uid-dialog/different-uid-dialog.component';
import { Step1Component } from './url-setup/step1/step1.component';
import { EndComponent } from './url-setup/end/end.component';
import { StepComponent } from './url-setup/step/step.component';
import { UrlInputComponent } from './url-input/url-input.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AuthComponent,
    LogoutComponent,
    UrlDialogComponent,
    UrlSetupComponent,
    DifferentUidDialogComponent,
    Step1Component,
    EndComponent,
    StepComponent,
    UrlInputComponent,
  ],
  imports: [SharedModule, TranslateModule, LandingModule],
  exports: [UrlInputComponent],
})
export class AuthModule {}
