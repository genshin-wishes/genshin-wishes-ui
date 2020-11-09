import { NgModule } from '@angular/core';
import { WishesComponent } from './wishes.component';
import { SharedModule } from '../shared/shared.module';
import { WishCardComponent } from './wish-card/wish-card.component';
import { BannerNavComponent } from './banner-nav/banner-nav.component';
import { WishEmptyComponent } from './wish-empty/wish-empty.component';

@NgModule({
  declarations: [
    WishesComponent,
    WishCardComponent,
    BannerNavComponent,
    WishEmptyComponent,
  ],
  imports: [SharedModule],
})
export class WishesModule {}
