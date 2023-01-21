import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreProductsDetailsComponent } from './store-products-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [StoreProductsDetailsComponent],
  providers: [],
  exports: [StoreProductsDetailsComponent],
})
export class StoreProductsDetailsComponentModule {}
