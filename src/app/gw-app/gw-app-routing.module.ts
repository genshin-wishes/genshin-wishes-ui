import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { WishesComponent } from './wishes/wishes.component';
import { FaqComponent } from '../core/faq/faq.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';

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
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'stats',
    children: [
      {
        path: ':banner',
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
