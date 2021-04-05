import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { StatsModule } from '../gw-app/stats/stats.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileBannerComponent } from './profile-banner/profile-banner.component';
import { CoreModule } from '../core/core.module';
import { ProfileShareDialogComponent } from './profile-share-dialog/profile-share-dialog.component';
import { ProfileFooterComponent } from './profile-footer/profile-footer.component';

@NgModule({
  declarations: [ProfileComponent, ProfileBannerComponent, ProfileShareDialogComponent, ProfileFooterComponent],
  imports: [SharedModule, StatsModule, ProfileRoutingModule, CoreModule],
})
export class ProfileModule {}
