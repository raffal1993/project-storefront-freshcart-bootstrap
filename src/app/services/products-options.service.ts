import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sortOptions } from '../commons/sortOptions';
import { SortOptions } from '../types/sortOptions.type';
import { PriceFilter } from '../types/priceFilter.type';
import { RatingFilter } from '../types/ratingFilter.type';
import { PaginationOptions } from '../types/paginationOptions.type';
import { defaultPageOptions } from '../commons/paginationOptions';

@Injectable({ providedIn: 'root' })
export class ProductsOptionsService {
  readonly _activeSortOptionsSubject: BehaviorSubject<SortOptions> =
    new BehaviorSubject<SortOptions>(sortOptions[0]);

  readonly _priceFilterSubject: BehaviorSubject<PriceFilter> =
    new BehaviorSubject<PriceFilter>({ priceFrom: null, priceTo: null });

  readonly _ratingFilterSubject: BehaviorSubject<RatingFilter> =
    new BehaviorSubject<RatingFilter>({
      5: false,
      4: false,
      3: false,
      2: false,
    });

  readonly _paginationOptionsSubject: BehaviorSubject<PaginationOptions> =
    new BehaviorSubject<PaginationOptions>(defaultPageOptions);
}
