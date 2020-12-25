import { NgModule } from '@angular/core';
import { WishesComponent } from './wishes.component';
import { SharedModule } from '../shared/shared.module';
import { WishCardComponent } from './wish-card/wish-card.component';
import { BannerNavComponent } from './banner-nav/banner-nav.component';
import { WishEmptyComponent } from './wish-empty/wish-empty.component';
import { WishFiltersComponent } from './wish-filters/wish-filters.component';
import { WishListComponent } from './wish-list/wish-list.component';

@NgModule({
  declarations: [
    WishesComponent,
    WishCardComponent,
    BannerNavComponent,
    WishEmptyComponent,
    WishFiltersComponent,
    WishListComponent,
  ],
  imports: [SharedModule],
})
export class WishesModule {}
