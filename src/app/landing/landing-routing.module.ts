import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from '../core/faq/faq.component';
import { NotAuthGuard } from '../auth/not-auth.guard';
import { LandingComponent } from './landing.component';
import { AuthComponent } from '../auth/auth/auth.component';
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
