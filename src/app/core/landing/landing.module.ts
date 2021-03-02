import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingCardComponent } from '../landing-card/landing-card.component';
import { LandingCardElementComponent } from '../landing-card-element/landing-card-element.component';
import { SharedModule } from '../../shared/shared.module';
import { FaqModule } from '../../faq/faq.module';

@NgModule({
  declarations: [
    LandingComponent,
    LandingCardComponent,
    LandingCardElementComponent,
  ],
  imports: [SharedModule, FaqModule],
  exports: [LandingComponent],
})
export class LandingModule {}
