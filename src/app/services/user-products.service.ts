import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProductsService {
  readonly _wishlistProductsIdsSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>(this.getWishlistFromLS());

  addToWishlist(id: string): void {
    const newValues = [
      ...new Set([...this._wishlistProductsIdsSubject.value, id]),
    ];
    this._wishlistProductsIdsSubject.next(newValues);
    this.setWishlistToLS(newValues);
  }

  removeFromWishList(id: string): void {
    const newValues = this._wishlistProductsIdsSubject.value.filter(
      (wishlistId) => id !== wishlistId
    );
    this._wishlistProductsIdsSubject.next(newValues);
    this.setWishlistToLS(newValues);
  }

  private setWishlistToLS(ids: string[]) {
    localStorage.setItem('wishlistIds', JSON.stringify(ids));
  }

  private getWishlistFromLS(): string[] {
    const itemLS = localStorage.getItem('wishlistIds');
    return itemLS ? JSON.parse(itemLS) : [];
  }
}
