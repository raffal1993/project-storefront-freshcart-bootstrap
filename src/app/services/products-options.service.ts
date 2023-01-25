import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sortOptions } from '../commons/sortOptions';
import { SortOptions } from '../types/sortOptions.type';
import { PriceFilter } from '../types/priceFilter.type';
import { RatingFilter } from '../types/ratingFilter.type';
import { PaginationOptions } from '../types/paginationOptions.type';
import { defaultPageOptions } from '../commons/paginationOptions';
import { ratingFilterInitialValues } from '../commons/ratingFilterOptions';

@Injectable({ providedIn: 'root' })
export class ProductsOptionsService {
  readonly _activeSortOptionsSubject: BehaviorSubject<SortOptions> =
    new BehaviorSubject<SortOptions>(sortOptions[0]);

  readonly _priceFilterSubject: BehaviorSubject<PriceFilter> =
    new BehaviorSubject<PriceFilter>({ priceFrom: null, priceTo: null });

  readonly _ratingFilterSubject: BehaviorSubject<RatingFilter> =
    new BehaviorSubject<RatingFilter>(ratingFilterInitialValues);

  readonly _paginationOptionsSubject: BehaviorSubject<PaginationOptions> =
    new BehaviorSubject<PaginationOptions>(defaultPageOptions);

  readonly _storesFilterSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>([]);

  readonly _searchByStoreSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  resetOptions() {
    this._priceFilterSubject.next({ priceFrom: null, priceTo: null });
    this._ratingFilterSubject.next(ratingFilterInitialValues);
    this._paginationOptionsSubject.next(defaultPageOptions);
    this._storesFilterSubject.next([]);
    this._searchByStoreSubject.next('');
  }
}
