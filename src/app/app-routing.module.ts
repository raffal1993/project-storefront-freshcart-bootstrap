import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreProductsComponent } from './components/store-products/store-products.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { HomeComponent } from './components/home/home.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { StoreProductsComponentModule } from './components/store-products/store-products.component-module';
import { CategoryProductsComponentModule } from './components/category-products/category-products.component-module';
import { HomeComponentModule } from './components/home/home.component-module';
import { WishlistComponentModule } from './components/wishlist/wishlist.component-module';

const routes: Routes = [
  { path: 'stores/:storeId', component: StoreProductsComponent },
  { path: 'categories/:categoryId', component: CategoryProductsComponent },
  { path: '', component: HomeComponent },
  { path: 'wishlist', component: WishlistComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreProductsComponentModule,
    CategoryProductsComponentModule,
    HomeComponentModule,
    WishlistComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
