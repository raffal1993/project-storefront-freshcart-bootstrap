import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryQueryModel } from 'src/app/query-models/categories-products-page-query.model';
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

  readonly priceForm: FormGroup = new FormGroup({
    priceFrom: new FormControl(null, { validators: [Validators.min(0)] }),
    priceTo: new FormControl(null, { validators: [Validators.min(0)] }),
  });

  constructor(private _productsOptionsService: ProductsOptionsService) {}

  ngAfterViewInit(): void {
    this.priceForm.valueChanges.subscribe((data) =>
      this._productsOptionsService._priceFilterSubject.next(data)
    );
  }
}
