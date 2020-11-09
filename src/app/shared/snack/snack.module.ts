import { NgModule } from '@angular/core';
import { SnackComponent } from './snack.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../mat/mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [SnackComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatModule,
    FlexLayoutModule,
    IconModule,
  ],
})
export class SnackModule {}
