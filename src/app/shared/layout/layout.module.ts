import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MatModule } from '../mat/mat.module';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '../icon/icon.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { ItemImgComponent } from './item-img/item-img.component';
import { SlugifyPipe } from './slugify.pipe';
import { GaClickDirective } from './ga-click.directive';
import { ItemNamePipe } from './item-name.pipe';
import { BannerSelectComponent } from './banner-select/banner-select.component';
import { GwDatePipe } from './gw-date.pipe';
import { FormsModule } from '@angular/forms';
import { WishImportProgressComponent } from './wish-import-progress/wish-import-progress.component';

@NgModule({
  declarations: [
    FooterComponent,
    TopBarComponent,
    LogoComponent,
    ItemImgComponent,
    SlugifyPipe,
    ItemNamePipe,
    GwDatePipe,
    GaClickDirective,
    BannerSelectComponent,
    WishImportProgressComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatModule,
    TranslateModule,
    FlexLayoutModule,
    IconModule,
  ],
  exports: [
    FooterComponent,
    TopBarComponent,
    LogoComponent,
    ItemImgComponent,
    SlugifyPipe,
    ItemNamePipe,
    GwDatePipe,
    GaClickDirective,
    BannerSelectComponent,
    WishImportProgressComponent,
  ],
  providers: [SlugifyPipe],
})
export class LayoutModule {}
