import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShopByCategoryComponent } from './shop-by-category.component';

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [ShopByCategoryComponent],
  providers: [],
  exports: [ShopByCategoryComponent],
})
export class ShopByCategoryComponentModule {}
