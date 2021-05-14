import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';
import { LandingTopComponent } from './landing-top/landing-top.component';
import { LandingHeroComponent } from './landing-hero/landing-hero.component';
import { SharedModule } from '../shared/shared.module';
import { LandingMenuComponent } from './landing-menu/landing-menu.component';
import { LandingCountersComponent } from './landing-counters/landing-counters.component';
import { LandingFooterComponent } from './landing-footer/landing-footer.component';
import { LandingFooterBannerComponent } from './landing-footer-banner/landing-footer-banner.component';
import { LandingCommentsComponent } from './landing-comments/landing-comments.component';
import { LandingCommentComponent } from './landing-comments/landing-comment/landing-comment.component';
import { LandingSecurityComponent } from './landing-security/landing-security.component';
import { LandingIconComponent } from './landing-icon/landing-icon.component';
import { LandingSecurityCardComponent } from './landing-security/landing-security-card/landing-security-card.component';
import { LandingFeatureTourComponent } from './landing-feature-tour/landing-feature-tour.component';
import { LandingFeatureComponent } from './landing-feature-tour/landing-feature/landing-feature.component';
import { CoreModule } from '../core/core.module';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  declarations: [
    LandingComponent,
    LandingTopComponent,
    LandingHeroComponent,
    LandingMenuComponent,
    LandingCountersComponent,
    LandingFooterComponent,
    LandingFooterBannerComponent,
    LandingCommentsComponent,
    LandingCommentComponent,
    LandingSecurityComponent,
    LandingIconComponent,
    LandingSecurityCardComponent,
    LandingFeatureTourComponent,
    LandingFeatureComponent,
    LandingLayoutComponent,
  ],
  imports: [SharedModule, CoreModule, LandingRoutingModule],
  exports: [LandingComponent, LandingLayoutComponent, LandingIconComponent],
})
export class LandingModule {}
