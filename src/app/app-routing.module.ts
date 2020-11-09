import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth/auth.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BaseComponent } from './core/base/base.component';
import { LandingCardComponent } from './core/landing-card/landing-card.component';
import { NotAuthGuard } from './auth/not-auth.guard';
import { UrlSetupComponent } from './auth/url-setup/url-setup.component';
import { MihoyoLinkGuard } from './auth/mihoyo-link.guard';
import { WishesComponent } from './wishes/wishes.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [NotAuthGuard],
    component: LandingCardComponent,
  },
  {
    path: 'login',
    canActivate: [NotAuthGuard],
    component: AuthComponent,
  },
  {
    path: 'setup',
    canActivate: [MihoyoLinkGuard],
    component: UrlSetupComponent,
  },
  {
    path: 'login/oauth2/callback/:registrationId',
    component: AuthComponent,
  },
  { path: 'logout', component: LogoutComponent },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'banners',
        component: DashboardComponent,
      },
      {
        path: 'banners/:banner',
        component: WishesComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
