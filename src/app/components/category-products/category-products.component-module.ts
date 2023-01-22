import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsContentComponentModule } from '../products-content/products-content.component-module';
import { ProductsSidebarComponentModule } from '../products-sidebar/products-sidebar.component-module';
import { CategoryProductsComponent } from './category-products.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsSidebarComponentModule,
    ProductsContentComponentModule,
  ],
  declarations: [CategoryProductsComponent],
  providers: [],
  exports: [CategoryProductsComponent],
})
export class CategoryProductsComponentModule {}
