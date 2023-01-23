import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sortOptions } from '../commons/sortOptions';
import { SortOptions } from '../types/sortOptions.type';
import { PriceFilter } from '../types/priceFilter.type';

@Injectable({ providedIn: 'root' })
export class ProductsOptionsService {
  readonly _activeSortOptionsSubject: BehaviorSubject<SortOptions> =
    new BehaviorSubject<SortOptions>(sortOptions[0]);

  readonly _priceFilterSubject: BehaviorSubject<PriceFilter> =
    new BehaviorSubject<PriceFilter>({ priceFrom: null, priceTo: null });
}
