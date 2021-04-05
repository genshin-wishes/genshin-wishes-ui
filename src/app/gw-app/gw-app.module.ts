import { NgModule } from '@angular/core';

import { GwAppRoutingModule } from './gw-app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WishesModule } from './wishes/wishes.module';
import { StatsModule } from './stats/stats.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  imports: [
    DashboardModule,
    WishesModule,
    StatsModule,
    SettingsModule,
    GwAppRoutingModule,
  ],
})
export class GwAppModule {}
