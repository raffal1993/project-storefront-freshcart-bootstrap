import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { ShoppingCartProduct } from 'src/app/types/userProducts';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { UserProductsService } from '../../services/user-products.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService
    .getAll()
    .pipe(shareReplay(1));

  private _isCollapsedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public isCollapsed$: Observable<boolean> =
    this._isCollapsedSubject.asObservable();

  readonly wishlistProductsIds$: Observable<string[]> =
    this._userProductsService._wishlistProductsIdsSubject.asObservable();

  readonly shoppingCartProductsIds$: Observable<ShoppingCartProduct[]> =
    this._userProductsService._shoppingCartProductsSubject.asObservable();

  constructor(
    private _categoriesService: CategoriesService,
    private _userProductsService: UserProductsService
  ) {}

  onClickHamburgerMenu(type?: string): void {
    this._isCollapsedSubject.next(
      type === 'close' ? true : !this._isCollapsedSubject.value
    );
  }

  showShoppingCart() {
    this._userProductsService._showSoppingCartSubject.next(true);
  }
}
