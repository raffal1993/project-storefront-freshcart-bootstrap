import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { HomeComponent } from './components/home/home.component';
import { StoreProductsComponent } from './components/store-products/store-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories/:categoryId', component: CategoryProductsComponent },
  { path: 'stores/:storeId', component: StoreProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
