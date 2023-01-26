import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { UserProductsService } from '../../services/user-products.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-wishlist',
  styleUrls: ['./wishlist.component.scss'],
  templateUrl: './wishlist.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent {
  readonly wishlistProductsIds$: Observable<string[]> =
    this._userProductsService._wishlistProductsIdsSubject.asObservable();

  readonly wishlistProducts$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAll(),
    this.wishlistProductsIds$,
  ]).pipe(
    map(([products, ids]) => products.filter((prod) => ids.includes(prod.id))),
    shareReplay(1)
  );

  constructor(
    private _userProductsService: UserProductsService,
    private _productsService: ProductsService
  ) {}

  removeProduct(id: string) {
    this._userProductsService.removeFromWishList(id);
  }
}
