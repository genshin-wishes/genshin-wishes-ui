import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatModule } from '../mat/mat.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MatModule, TranslateModule, FlexLayoutModule],
})
export class ConfirmDialogModule {}
