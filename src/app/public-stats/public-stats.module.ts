import { NgModule } from '@angular/core';

import { PublicStatsRoutingModule } from './public-stats-routing.module';
import { PublicStatsComponent } from './public-stats.component';
import { StatsModule } from '../gw-app/stats/stats.module';
import { CountPerBannerComponent } from './count-per-banner/count-per-banner.component';
import { SharedModule } from '../shared/shared.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { CountCardComponent } from './count-card/count-card.component';
import { UsersPerRegionComponent } from './players-by-region/users-per-region.component';
import { WishesPerRegionComponent } from './wishes-per-region/wishes-per-region.component';
import { WishesModule } from '../gw-app/wishes/wishes.module';
import { EventCardComponent } from './event-card/event-card.component';
import { ExclusivityRateCardComponent } from './exclusivity-rate-card/exclusivity-rate-card.component';
import { PityDistributionComponent } from './pity-distribution/pity-distribution.component';
import { PityDistributionCardComponent } from './pity-distribution-card/pity-distribution-card.component';
import { LatestEventsBannerComponent } from './latest-events-banner/latest-events-banner.component';
import { EventBannerComponent } from './event-banner/event-banner.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';

@NgModule({
  declarations: [
    PublicStatsComponent,
    CountPerBannerComponent,
    ItemsListComponent,
    CountCardComponent,
    UsersPerRegionComponent,
    WishesPerRegionComponent,
    EventCardComponent,
    ExclusivityRateCardComponent,
    PityDistributionComponent,
    PityDistributionCardComponent,
    LatestEventsBannerComponent,
    EventBannerComponent,
    LearnMoreComponent,
  ],
  imports: [SharedModule, PublicStatsRoutingModule, StatsModule, WishesModule],
})
export class PublicStatsModule {}
