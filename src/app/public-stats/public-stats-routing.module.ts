import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from '../landing/landing-layout/landing-layout.component';
import { PublicStatsComponent } from './public-stats.component';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: ':banner',
        component: PublicStatsComponent,
      },
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicStatsRoutingModule {}
