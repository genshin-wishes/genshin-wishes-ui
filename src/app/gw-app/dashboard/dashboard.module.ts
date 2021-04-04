import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { BannerCardComponent } from './banner-card/banner-card.component';

@NgModule({
  declarations: [DashboardComponent, BannerCardComponent],
  imports: [SharedModule],
})
export class DashboardModule {}
