import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [SharedModule],
  exports: [FaqComponent],
})
export class FaqModule {}
