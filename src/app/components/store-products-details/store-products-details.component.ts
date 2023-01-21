import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { StoreModel } from '../../models/store.model';
import { ProductModel } from '../../models/product.model';
import { StoresService } from '../../services/stores.service';
import { ProductsService } from '../../services/products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-store-products-details',
  styleUrls: ['./store-products-details.component.scss'],
  templateUrl: './store-products-details.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreProductsDetailsComponent {
  readonly storeId$: Observable<string> = this._activatedRoute.params.pipe(
    map((params) => params['storeId'])
  );

  readonly searchProductForm: FormControl = new FormControl();

  readonly store$: Observable<StoreModel> = this.storeId$.pipe(
    switchMap((id) =>
      this._storesService.getStore(id).pipe(
        map((storeInfo) => ({
          ...storeInfo,
          distanceInMeters:
            Math.round((storeInfo.distanceInMeters / 1000) * 10) / 10,
        }))
      )
    )
  );

  readonly products$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAll(),
    this.storeId$,
    this.searchProductForm.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([products, id, searchValue]) =>
      products.filter(
        (prod) =>
          prod.storeIds.includes(id) &&
          prod.name.match(new RegExp(searchValue, 'i'))
      )
    )
  );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storesService: StoresService,
    private _productsService: ProductsService
  ) {}
}
