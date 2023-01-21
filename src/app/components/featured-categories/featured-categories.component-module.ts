import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeaturedCategoriesComponent } from './featured-categories.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FeaturedCategoriesComponent],
  providers: [],
  exports: [FeaturedCategoriesComponent]
})
export class FeaturedCategoriesComponentModule {
}
