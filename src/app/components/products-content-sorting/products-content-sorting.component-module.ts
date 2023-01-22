import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsContentSortingComponent } from './products-content-sorting.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ProductsContentSortingComponent],
  providers: [],
  exports: [ProductsContentSortingComponent],
})
export class ProductsContentSortingComponentModule {}
