import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  shareReplay,
} from 'rxjs';
import {
  CategoryQueryModel,
  ProductQueryModel,
} from '../../query-models/categories-products-page-query.model';
import { PaginationOptions } from '../../types/paginationOptions.type';
import { ProductsOptionsService } from '../../services/products-options.service';
import {
  defaultPageOptions,
  pageLimitOptions,
} from 'src/app/commons/paginationOptions';

@Component({
  selector: 'app-products-content',
  styleUrls: ['./products-content.component.scss'],
  templateUrl: './products-content.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsContentComponent {
  @Input() category: CategoryQueryModel | null = null;
  @Input() products: ProductQueryModel[] | null = [];

  private _productsDataSubject: BehaviorSubject<ProductQueryModel[]> =
    new BehaviorSubject<ProductQueryModel[]>([]);

  readonly productsData$: Observable<ProductQueryModel[]> =
    this._productsDataSubject.asObservable().pipe(shareReplay(1));

  readonly pageOptions$: Observable<PaginationOptions> =
    this._productsOptionsService._paginationOptionsSubject
      .asObservable()
      .pipe(shareReplay(1));

  readonly productsToDisplay$: Observable<ProductQueryModel[]> = combineLatest([
    this.productsData$,
    this.pageOptions$,
  ]).pipe(
    map(
      ([products, { limit, pagination }]) =>
        products &&
        products.slice(
          (pagination - 1) * limit,
          (pagination - 1) * limit + limit
        )
    )
  );

  readonly pages$: Observable<number[]> = combineLatest([
    this.productsData$,
    this.pageOptions$,
  ]).pipe(
    map(([products, options]) => {
      const pages = products ? Math.ceil(products.length / options.limit) : 0;
      return [...Array(pages + 1).keys()].slice(1);
    })
  );

  readonly pageLimit$ = of(pageLimitOptions);

  readonly paginationForm: FormGroup = new FormGroup({
    limit: new FormControl(defaultPageOptions.limit),
    pagination: new FormControl(defaultPageOptions.pagination),
  });

  constructor(private _productsOptionsService: ProductsOptionsService) {}

  onPageOptionsChange(value: number, name: keyof PaginationOptions): void {
    this.paginationForm.get(name)?.setValue(value);
  }

  onResponsiveFiltersToggle() {
    this._productsOptionsService.toggleResponsiveSidebar();
  }

  ngAfterViewInit(): void {
    combineLatest([
      this.productsData$,
      this.paginationForm.valueChanges,
    ]).subscribe(([products, values]) => {
      const hasToChangePage =
        products.length <= values.pagination * values.limit - values.limit;

      const newPage = Math.ceil(products.length / values.limit);

      hasToChangePage &&
        this.paginationForm.get('pagination')?.setValue(newPage);

      const newValues = hasToChangePage
        ? { ...values, pagination: newPage || 1 }
        : { ...values, pagination: values.pagination || 1 };

      return this._productsOptionsService._paginationOptionsSubject.next({
        ...newValues,
      });
    });
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty('products')) {
      this._productsDataSubject.next(changes['products'].currentValue);
    }
  }
}
