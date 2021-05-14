import { NgModule } from '@angular/core';
import { StatsComponent } from './stats.component';
import { SharedModule } from '../../shared/shared.module';
import { WishesModule } from '../wishes/wishes.module';
import { StatCardComponent } from './stat-card/stat-card.component';
import { WishesRepartitionComponent } from './wishes-repartition/wishes-repartition.component';
import { RankDistributionComponent } from './rank-distribution/rank-distribution.component';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-labels';
import { FocusDistributionComponent } from './focus-distribution/focus-distribution.component';
import { FourStarsDetailsComponent } from './four-stars-details/four-stars-details.component';
import { FiveStarsListComponent } from './five-stars-list/five-stars-list.component';
import { FourStarsListComponent } from './four-stars-list/four-stars-list.component';
import { StatsHeaderComponent } from './stats-header/stats-header.component';
import { BannerActivityComponent } from './banner-activity/banner-activity.component';
import { FiveStarsHistoryComponent } from './five-stars-list/five-stars-history/five-stars-history.component';
import { FourStarsHistoryComponent } from './four-stars-list/four-stars-history/four-stars-history.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [
    StatsComponent,
    StatCardComponent,
    WishesRepartitionComponent,
    RankDistributionComponent,
    FocusDistributionComponent,
    FourStarsDetailsComponent,
    FiveStarsListComponent,
    FourStarsListComponent,
    StatsHeaderComponent,
    BannerActivityComponent,
    FiveStarsHistoryComponent,
    FourStarsHistoryComponent,
    EmptyComponent,
  ],
  imports: [SharedModule, WishesModule, ChartsModule],
  exports: [StatsComponent, ChartsModule, BannerActivityComponent],
})
export class StatsModule {}
