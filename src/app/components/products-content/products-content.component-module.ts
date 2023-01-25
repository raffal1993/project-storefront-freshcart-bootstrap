import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsContentSortingComponentModule } from '../products-content-sorting/products-content-sorting.component-module';
import { ProductsContentComponent } from './products-content.component';

@NgModule({
  imports: [CommonModule, ProductsContentSortingComponentModule, ReactiveFormsModule],
  declarations: [ProductsContentComponent],
  providers: [],
  exports: [ProductsContentComponent],
})
export class ProductsContentComponentModule { }
