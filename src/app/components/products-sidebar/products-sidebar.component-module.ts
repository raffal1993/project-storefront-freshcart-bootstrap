import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsSidebarComponent } from './products-sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProductsSidebarComponent],
  providers: [],
  exports: [ProductsSidebarComponent],
})
export class ProductsSidebarComponentModule {}
