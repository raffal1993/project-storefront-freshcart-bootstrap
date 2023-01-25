import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryQueryModel } from 'src/app/query-models/categories-products-page-query.model';
import { StoreCategoriesSidebarQueryModel } from 'src/app/query-models/store-query.model';
import { ProductsOptionsService } from 'src/app/services/products-options.service';

@Component({
  selector: 'app-products-sidebar',
  styleUrls: ['./products-sidebar.component.scss'],
  templateUrl: './products-sidebar.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsSidebarComponent {
  @Input() categories: CategoryQueryModel[] | null = [];
  @Input() stores: StoreCategoriesSidebarQueryModel[] | null = [];

  readonly priceForm: FormGroup = new FormGroup({
    priceFrom: new FormControl(null, { validators: [Validators.min(0)] }),
    priceTo: new FormControl(null, { validators: [Validators.min(0)] }),
  });

  readonly ratingForm: FormGroup = new FormGroup({
    ratingFive: new FormControl(),
    ratingFour: new FormControl(),
    ratingThree: new FormControl(),
    ratingTwo: new FormControl(),
  });

  readonly storesForm: FormControl = new FormControl();

  constructor(private _productsOptionsService: ProductsOptionsService) {}

  ngAfterViewInit(): void {
    this.priceForm.valueChanges.subscribe((data) =>
      this._productsOptionsService._priceFilterSubject.next(data)
    );

    this.ratingForm.valueChanges.subscribe((ratings) =>
      this._productsOptionsService._ratingFilterSubject.next({
        '5': ratings.ratingFive || false,
        '4': ratings.ratingFour || false,
        '3': ratings.ratingThree || false,
        '2': ratings.ratingTwo || false,
      })
    );

    this.storesForm.valueChanges.subscribe((id) => {
      const oldValues = this._productsOptionsService._storesFilterSubject.value;
      const newValues = oldValues.includes(id)
        ? oldValues.filter((v) => v !== id)
        : [...oldValues, id];
      this._productsOptionsService._storesFilterSubject.next(newValues);
    });
  }
}
