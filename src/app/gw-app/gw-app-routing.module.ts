import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { WishesComponent } from './wishes/wishes.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { StatsResolver } from '../stats/stats.resolver';

const routes: Routes = [
  {
    path: 'banners',
    component: DashboardComponent,
  },
  {
    path: 'banners/:banner',
    component: WishesComponent,
  },
  {
    path: 'stats',
    children: [
      {
        path: ':banner',
        resolve: { statsEndpoint: StatsResolver },
        component: StatsComponent,
      },
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GwAppRoutingModule {}
