import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { CategoryModel } from '../../models/category.model';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import {
  FruitsAndVegetablesProduct,
  ProductsQueryModel,
  SnackAndMunchiesProduct,
} from 'src/app/query-models/featured-categories-query.model';

@Component({
  selector: 'app-featured-categories',
  styleUrls: ['./featured-categories.component.scss'],
  templateUrl: './featured-categories.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCategoriesComponent {
  readonly products$: Observable<ProductModel[]> = this._productsService
    .getAll()
    .pipe(shareReplay(1));
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService
    .getAll()
    .pipe(shareReplay(1));

  readonly fruitsAndVegetables$: Observable<
    ProductsQueryModel<FruitsAndVegetablesProduct>
  > = combineLatest([this.products$, this.categories$]).pipe(
    map(([products, categories]) => ({
      name: this._fruitsAndVegetablesCategoryName,
      products: this._getCategoryProducts(
        categories,
        products,
        this._fruitsAndVegetablesCategoryName
      ),
    }))
  );

  readonly snackAndMunchies$: Observable<
    ProductsQueryModel<SnackAndMunchiesProduct>
  > = combineLatest([this.products$, this.categories$]).pipe(
    map(([products, categories]) => ({
      name: this._snackAndMunchiesCategoryName,
      products: this._getCategoryProducts(
        categories,
        products,
        this._snackAndMunchiesCategoryName
      ),
    }))
  );

  constructor(
    private _productsService: ProductsService,
    private _categoriesService: CategoriesService
  ) {}

  private _getCategoryProducts(
    categories: CategoryModel[],
    products: ProductModel[],
    searchingCategoryName: string
  ) {
    const categoryMap = categories.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr }),
      {}
    ) as Record<string, CategoryModel>;

    return products
      .filter(
        (prod) => categoryMap[prod.categoryId].name === searchingCategoryName
      )
      .sort((a, b) =>
        a.featureValue === b.featureValue
          ? 0
          : a.featureValue > b.featureValue
          ? -1
          : 1
      )
      .map((fProd) => ({
        name: fProd.name,
        price: fProd.price,
        imgUrl: fProd.imageUrl,
      }))
      .slice(0, this._productsLimit);
  }

  private _fruitsAndVegetablesCategoryName = `Fruits & Vegetables`;
  private _snackAndMunchiesCategoryName = `Snack & Munchies`;
  private _productsLimit = 5;

  ngOnInit(): void {
    this.fruitsAndVegetables$.subscribe((data) => console.log(data));
    this.snackAndMunchies$.subscribe((data) => console.log(data));
  }
}
