import { NgModule } from '@angular/core';
import { MatModule } from './mat/mat.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { IconModule } from './icon/icon.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { SnackModule } from './snack/snack.module';
import { NgLetDirective } from './ng-let.directive';
import { StarIconComponent } from './star-icon/star-icon.component';
import { PityChipComponent } from './pity-chip/pity-chip.component';
import { FocusChipComponent } from './focus-chip/focus-chip.component';

@NgModule({
  imports: [TranslateModule],
  exports: [
    // Angular & 3rd party
    CommonModule,
    RouterModule,
    TranslateModule,
    ToastrModule,
    FlexLayoutModule,
    MarkdownModule,
    FormsModule,
    NgxMasonryModule,
    // Modules
    MatModule,
    IconModule,
    ConfirmDialogModule,
    LayoutModule,
    SnackModule,
    // Declarations
    NgLetDirective,
    StarIconComponent,
    PityChipComponent,
    FocusChipComponent,
  ],
  declarations: [
    NgLetDirective,
    StarIconComponent,
    PityChipComponent,
    FocusChipComponent,
  ],
})
export class SharedModule {}
