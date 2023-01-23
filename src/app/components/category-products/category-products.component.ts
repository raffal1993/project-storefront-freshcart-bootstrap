import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { ProductModel } from '../../models/product.model';
import { ProductQueryModel } from '../../query-models/categories-products-page-query.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { ProductsOptionsService } from '../../services/products-options.service';
import { SortOptions } from 'src/app/types/sortOptions.type';
import { getProductsWithRatingStars } from 'src/app/utils/getProductsWithRatingStars';
import { sortProducts } from 'src/app/utils/sortProducts';
import { PriceFilter } from 'src/app/types/priceFilter.type';

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

  readonly activeSortOption$: Observable<SortOptions> =
    this._productsOptionsService._activeSortOptionsSubject.asObservable();

  readonly priceFilter$: Observable<PriceFilter> =
    this._productsOptionsService._priceFilterSubject.asObservable();

  readonly customizedProducts$: Observable<ProductQueryModel[]> = combineLatest(
    [this.products$, this.category$, this.activeSortOption$]
  ).pipe(
    map(([products, category, sortOption]) => {
      // Filter by category --->
      const filteredProducts = products.filter(
        (prod) => prod.categoryId === category?.id
      );
      // Add ratingStars property --->
      const productsWithRatingStars =
        getProductsWithRatingStars(filteredProducts);
      // Sort --->
      return sortProducts(productsWithRatingStars, sortOption);
    })
  );

  constructor(
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _productsOptionsService: ProductsOptionsService
  ) {}
}
