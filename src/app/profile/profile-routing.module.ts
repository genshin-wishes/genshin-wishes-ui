import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from '../gw-app/stats/stats.component';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile.resolver';

const routes: Routes = [
  {
    path: ':profileId',
    component: ProfileComponent,
    children: [
      {
        path: 'stats',
        children: [
          {
            path: ':banner',
            resolve: { statsEndpoint: ProfileResolver },
            data: {
              profileMode: true,
            },
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
        path: '',
        redirectTo: 'stats',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
