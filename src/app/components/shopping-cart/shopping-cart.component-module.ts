import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ShoppingCartComponent],
  providers: [],
  exports: [ShoppingCartComponent],
})
export class ShoppingCartComponentModule {}
