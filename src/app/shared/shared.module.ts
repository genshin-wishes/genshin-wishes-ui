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

@NgModule({
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
  ],
})
export class SharedModule {}
