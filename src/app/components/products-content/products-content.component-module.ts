import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsContentSortingComponentModule } from '../products-content-sorting/products-content-sorting.component-module';
import { ProductsContentComponent } from './products-content.component';

@NgModule({
  imports: [CommonModule, ProductsContentSortingComponentModule],
  declarations: [ProductsContentComponent],
  providers: [],
  exports: [ProductsContentComponent],
})
export class ProductsContentComponentModule {}
