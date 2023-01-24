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
import { RatingFilter } from 'src/app/types/ratingFilter.type';
import { StoresService } from 'src/app/services/stores.service';
import { StoreCategoriesSidebarQueryModel } from 'src/app/query-models/store-query.model';
import { filterProducts } from 'src/app/utils/filterProducts';

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

  readonly ratingFilter$: Observable<RatingFilter> =
    this._productsOptionsService._ratingFilterSubject.asObservable();

  readonly storesFilter$: Observable<string[]> =
    this._productsOptionsService._storesFilterSubject.asObservable();

  readonly searchByStoreInput$: Observable<string> =
    this._productsOptionsService._searchByStoreSubject.asObservable();

  readonly stores$: Observable<StoreCategoriesSidebarQueryModel[]> =
    combineLatest([
      this._storesService.getAll(),
      this.searchByStoreInput$,
    ]).pipe(
      shareReplay(1),
      map(([stores, input]) => {
        return stores
          .filter((s) => (input ? !!s.name.match(new RegExp(input, 'i')) : s))
          .map((s) => ({ id: s.id, name: s.name }));
      })
    );

  readonly customizedProducts$: Observable<ProductQueryModel[]> = combineLatest(
    [
      this.products$,
      this.category$,
      this.activeSortOption$,
      this.priceFilter$,
      this.ratingFilter$,
      this.storesFilter$,
    ]
  ).pipe(
    map(([prods, category, sortO, priceF, ratingF, storesF]) => {
      const filteredProducts = filterProducts(
        prods,
        category?.id || '',
        priceF,
        ratingF,
        storesF
      );

      // Add ratingStars property --->
      const productsWithRatingStars =
        getProductsWithRatingStars(filteredProducts);
      // Sort --->
      return sortProducts(productsWithRatingStars, sortO);
    })
  );

  constructor(
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _productsOptionsService: ProductsOptionsService,
    private _storesService: StoresService
  ) {}
}
