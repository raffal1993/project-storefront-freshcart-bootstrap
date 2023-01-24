import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { ProductQueryModel } from 'src/app/query-models/categories-products-page-query.model';
import { CategoryModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductsComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService
    .getAll()
    .pipe(shareReplay(1));

  readonly products$: Observable<ProductModel[]> = this._productsService
    .getAll()
    .pipe(shareReplay(1));

  readonly category$: Observable<CategoryModel | null> = combineLatest([
    this.categories$,
    this._activatedRoute.params.pipe(map((params) => params['categoryId'])),
  ]).pipe(
    map(
      ([categories, categoryId]) =>
        categories.find((cat) => cat.id === categoryId) || null
    )
  );

  readonly customizedProducts$: Observable<ProductQueryModel[]> = combineLatest(
    [this.products$, this.category$]
  ).pipe(
    // Filter by category --->
    map(([products, category]) =>
      products.filter((prod) => prod.categoryId === category?.id)
    ),
    // Add ratingStars property --->
    map((products) => this._getProductsWithRatingStars(products))
  );

  constructor(
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService
  ) {}

  private _getProductsWithRatingStars(
    products: ProductModel[]
  ): ProductQueryModel[] {
    return products.map((prod) => {
      const fill = Math.floor(prod.ratingValue);
      const half = prod.ratingValue - fill === 0 ? 0 : 1;
      const empty = 5 - fill - half;

      return {
        ...prod,
        ratingStars: {
          fill: Array(fill),
          half: Array(half),
          empty: Array(empty),
        },
      };
    });
  }
}
