import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from '../core/faq/faq.component';
import { NotAuthGuard } from '../auth/not-auth.guard';
import { LandingComponent } from './landing.component';
import { AuthComponent } from '../auth/auth/auth.component';
import { MihoyoLinkGuard } from '../auth/mihoyo-link.guard';
import { UrlSetupComponent } from '../auth/url-setup/url-setup.component';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', canActivate: [NotAuthGuard], component: LandingComponent },
      {
        path: 'login',
        canActivate: [NotAuthGuard],
        component: AuthComponent,
      },
      {
        path: 'login/oauth2/callback/:registrationId',
        canActivate: [NotAuthGuard],
        component: AuthComponent,
      },
      {
        path: 'setup',
        canActivate: [MihoyoLinkGuard],
        component: UrlSetupComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
