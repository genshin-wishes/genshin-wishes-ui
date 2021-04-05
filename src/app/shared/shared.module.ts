import { NgModule } from '@angular/core';
import { MatModule } from './mat/mat.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { IconModule } from './icon/icon.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { SnackModule } from './snack/snack.module';
import { NgLetDirective } from './ng-let.directive';
import { StarIconComponent } from './star-icon/star-icon.component';
import { PityChipComponent } from './pity-chip/pity-chip.component';
import { FocusChipComponent } from './focus-chip/focus-chip.component';
import { ItemNamePipe } from './item-name.pipe';
import { ItemImgComponent } from './item-img/item-img.component';
import { SlugifyPipe } from './slugify.pipe';
import { GwDatePipe } from './gw-date.pipe';
import { GaClickDirective } from './ga-click.directive';
import { WishImportProgressComponent } from './wish-import-progress/wish-import-progress.component';
import { BannerSelectComponent } from './banner-select/banner-select.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { CountryFlagComponent } from './country-flag/country-flag.component';
import { LogoComponent } from './logo/logo.component';
import { GwNumberPipe } from './gw-number.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatModule,
    FormsModule,
    FlexLayoutModule,
    IconModule,
    TranslateModule,
  ],
  exports: [
    // Angular & 3rd party
    CommonModule,
    RouterModule,
    TranslateModule,
    ToastrModule,
    FlexLayoutModule,
    MarkdownModule,
    FormsModule,
    // Modules
    MatModule,
    IconModule,
    ConfirmDialogModule,
    SnackModule,
    // Declarations
    NgLetDirective,
    StarIconComponent,
    PityChipComponent,
    FocusChipComponent,
    ItemNamePipe,
    ItemImgComponent,
    SlugifyPipe,
    GwDatePipe,
    GaClickDirective,
    WishImportProgressComponent,
    EmptyStateComponent,
    BannerSelectComponent,
    CountryFlagComponent,
    LogoComponent,
    GwNumberPipe,
  ],
  declarations: [
    NgLetDirective,
    StarIconComponent,
    PityChipComponent,
    FocusChipComponent,
    ItemNamePipe,
    ItemImgComponent,
    SlugifyPipe,
    GwDatePipe,
    GaClickDirective,
    WishImportProgressComponent,
    EmptyStateComponent,
    BannerSelectComponent,
    CountryFlagComponent,
    LogoComponent,
    GwNumberPipe,
  ],
  providers: [GwDatePipe],
})
export class SharedModule {}
