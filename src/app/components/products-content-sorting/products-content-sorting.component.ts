import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SortOptions } from 'src/app/types/sortOptions.type';
import { sortOptions } from 'src/app/commons/sortOptions';
import { ProductsOptionsService } from '../../services/products-options.service';

@Component({
  selector: 'app-products-content-sorting',
  styleUrls: ['./products-content-sorting.component.scss'],
  templateUrl: './products-content-sorting.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsContentSortingComponent {
  readonly sortForm: FormControl = new FormControl(sortOptions[0]);
  readonly sortOptions$: Observable<SortOptions[]> = of(sortOptions);

  constructor(private _productsOptionsService: ProductsOptionsService) {}

  ngAfterViewInit(): void {
    this.sortForm.valueChanges.subscribe((value) => {
      this._productsOptionsService._activeSortOptionsSubject.next(value);
    });
  }
}
