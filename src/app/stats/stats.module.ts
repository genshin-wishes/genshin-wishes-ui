import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { SharedModule } from '../shared/shared.module';
import { WishesModule } from '../wishes/wishes.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { ItemNamePipe } from '../shared/layout/item-name.pipe';
import { StatCardComponent } from './stat-card/stat-card.component';

@NgModule({
  declarations: [StatsComponent, StatCardComponent],
  imports: [SharedModule, WishesModule, GoogleChartsModule],
  providers: [ItemNamePipe],
})
export class StatsModule {}
