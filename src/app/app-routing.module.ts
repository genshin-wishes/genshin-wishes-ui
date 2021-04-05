import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth/auth.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { BaseComponent } from './core/base/base.component';
import { NotAuthGuard } from './auth/not-auth.guard';
import { UrlSetupComponent } from './auth/url-setup/url-setup.component';
import { MihoyoLinkGuard } from './auth/mihoyo-link.guard';
import { LandingComponent } from './landing/landing.component';
import { FaqComponent } from './core/faq/faq.component';
import { LandingLayoutComponent } from './landing/landing-layout/landing-layout.component';

const routes: Routes = [
  { path: 'logout', component: LogoutComponent },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./gw-app/gw-app.module').then((m) => m.GwAppModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'top',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
