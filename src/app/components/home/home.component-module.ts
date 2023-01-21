import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ShopByCategoryComponentModule } from '../shop-by-category/shop-by-category.component-module';
import { StoresComponentModule } from '../stores/stores.component-module';




@NgModule({
  imports: [CommonModule, RouterModule, ShopByCategoryComponentModule,StoresComponentModule],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
