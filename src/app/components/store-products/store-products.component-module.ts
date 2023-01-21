import { NgModule } from '@angular/core';
import { StoreProductsDetailsComponentModule } from '../store-products-details/store-products-details.component-module';
import { StoreProductsComponent } from './store-products.component';

@NgModule({
  imports: [StoreProductsDetailsComponentModule],
  declarations: [StoreProductsComponent],
  providers: [],
  exports: [StoreProductsComponent],
})
export class StoreProductsComponentModule {}
