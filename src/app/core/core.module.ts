import { NgModule } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { NavComponent } from './nav/nav.component';
import { CookieConsentComponent } from './cookie-consent/cookie-consent.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LandingCardComponent } from './landing/landing-card/landing-card.component';
import { LandingCardElementComponent } from './landing/landing-card-element/landing-card-element.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FaqComponent } from './faq/faq.component';
import { ItemNamePipe } from '../shared/item-name.pipe';
import { LogoComponent } from './logo/logo.component';
import { LocaleSelectComponent } from './locale-select/locale-select.component';

@NgModule({
  declarations: [
    BaseComponent,
    NavComponent,
    CookieConsentComponent,
    TopBarComponent,
    FooterComponent,
    FaqComponent,
    LandingComponent,
    LandingCardComponent,
    LandingCardElementComponent,
    LogoComponent,
    LocaleSelectComponent,
  ],
  imports: [SharedModule],
  providers: [ItemNamePipe],
  exports: [
    BaseComponent,
    NavComponent,
    CookieConsentComponent,
    TopBarComponent,
    FooterComponent,
    FaqComponent,
    LandingComponent,
    LandingCardComponent,
    LandingCardElementComponent,
    LogoComponent,
    LocaleSelectComponent,
  ],
})
export class CoreModule {}
