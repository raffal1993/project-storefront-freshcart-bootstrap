import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataFromLS, ShoppingCartProduct } from '../types/userProducts';

@Injectable({ providedIn: 'root' })
export class UserProductsService {
  readonly _wishlistProductsIdsSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>(this.getDataFromLS('wishlistIds'));

  readonly _showSoppingCartSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  readonly _shoppingCartProductsSubject: BehaviorSubject<
    ShoppingCartProduct[]
  > = new BehaviorSubject<ShoppingCartProduct[]>(
    this.getDataFromLS('shoppingCartIds')
  );

  addToWishlist(id: string): void {
    const newValues = [
      ...new Set([...this._wishlistProductsIdsSubject.value, id]),
    ];
    this._wishlistProductsIdsSubject.next(newValues);
    this.setDataToLS(newValues, 'wishlistIds');
  }

  removeFromWishList(id: string): void {
    const newValues = this._wishlistProductsIdsSubject.value.filter(
      (wishlistId) => id !== wishlistId
    );
    this._wishlistProductsIdsSubject.next(newValues);
    this.setDataToLS(newValues, 'wishlistIds');
  }

  addToShoppingCart(id: string): void {
    let hasProductInCart = false;
    const newValues = this._shoppingCartProductsSubject.value.map((prod) => {
      if (prod.id === id) {
        hasProductInCart = true;
        return { ...prod, quantity: prod.quantity + 1 };
      }
      return prod;
    });

    const updatedProducts = hasProductInCart
      ? newValues
      : [...newValues, { id: id, quantity: 1 }];

    this._shoppingCartProductsSubject.next(updatedProducts);

    this.setDataToLS(updatedProducts, 'shoppingCartIds');
  }

  removeFromShoppingCart(id: string, type: 'one' | 'all'): void {
    const updatedProducts =
      type === 'all'
        ? this._shoppingCartProductsSubject.value.filter(
            (prod) => prod.id !== id
          )
        : (this._shoppingCartProductsSubject.value
            .map((prod) => {
              if (prod.id !== id) return prod;
              return prod.quantity <= 1
                ? null
                : { id: prod.id, quantity: prod.quantity - 1 };
            })
            .filter(Boolean) as ShoppingCartProduct[]);

    this._shoppingCartProductsSubject.next(updatedProducts);

    this.setDataToLS(updatedProducts, 'shoppingCartIds');
  }

  private setDataToLS(
    data: string[] | ShoppingCartProduct[],
    key: 'wishlistIds' | 'shoppingCartIds'
  ) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getDataFromLS<T extends 'wishlistIds' | 'shoppingCartIds'>(
    key: T
  ): DataFromLS<T> {
    const itemLS = localStorage.getItem(key);

    return itemLS ? JSON.parse(itemLS) : [];
  }
}
