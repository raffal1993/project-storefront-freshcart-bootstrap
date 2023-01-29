import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { ShoppingCartQueryModel } from 'src/app/query-models/shopping-cart-products-query.mode';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartProduct } from 'src/app/types/userProducts';
import { UserProductsService } from '../../services/user-products.service';

@Component({
  selector: 'app-shopping-cart',
  styleUrls: ['./shopping-cart.component.scss'],
  templateUrl: './shopping-cart.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  readonly showSoppingCart$: Observable<boolean> =
    this._userProductsService._showSoppingCartSubject.asObservable();

  readonly shoppingCartProducts$: Observable<ShoppingCartProduct[]> =
    this._userProductsService._shoppingCartProductsSubject.asObservable();

  readonly products$: Observable<ShoppingCartQueryModel[]> = combineLatest([
    this._productsService.getAll(),
    this.shoppingCartProducts$,
  ]).pipe(
    map(([products, cartProducts]) => {
      const productsMap = products.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: curr }),
        {}
      ) as Record<string, ProductModel>;
      return cartProducts.map((cProd) => ({
        ...productsMap[cProd.id],
        quantity: cProd.quantity,
      }));
    }),
    shareReplay(1)
  );

  constructor(
    private _userProductsService: UserProductsService,
    private _productsService: ProductsService
  ) {}

  hideShoppingCart() {
    this._userProductsService._showSoppingCartSubject.next(false);
  }

  removeProduct(id: string, type: 'one' | 'all') {
    this._userProductsService.removeFromShoppingCart(id, type);
  }

  addProduct(id: string) {
    this._userProductsService.addToShoppingCart(id);
  }
}
