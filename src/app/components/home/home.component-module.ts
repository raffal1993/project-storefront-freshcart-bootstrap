import { NgModule } from '@angular/core';
import { FeaturedCategoriesComponentModule } from '../featured-categories/featured-categories.component-module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [FeaturedCategoriesComponentModule],
  declarations: [HomeComponent],
  providers: [],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
