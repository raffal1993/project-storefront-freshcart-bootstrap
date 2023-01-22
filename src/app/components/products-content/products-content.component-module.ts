import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsContentComponent } from './products-content.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductsContentComponent],
  providers: [],
  exports: [ProductsContentComponent],
})
export class ProductsContentComponentModule {}
