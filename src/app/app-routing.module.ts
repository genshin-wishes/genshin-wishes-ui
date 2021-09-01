import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';
import { BaseComponent } from './core/base/base.component';

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
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
