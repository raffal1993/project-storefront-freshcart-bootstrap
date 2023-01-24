import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sortOptions } from '../commons/sortOptions';
import { SortOptions } from '../types/sortOptions.type';

@Injectable({ providedIn: 'root' })
export class ProductsOptionsService {
  readonly _activeSortOptionsSubject: BehaviorSubject<SortOptions> =
    new BehaviorSubject<SortOptions>(sortOptions[0]);
}
