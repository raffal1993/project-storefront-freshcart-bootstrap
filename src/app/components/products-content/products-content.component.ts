import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  CategoryQueryModel,
  ProductQueryModel,
} from 'src/app/query-models/categories-products-page-query.model';

@Component({
  selector: 'app-products-content',
  styleUrls: ['./products-content.component.scss'],
  templateUrl: './products-content.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsContentComponent {
  @Input() category: CategoryQueryModel | null = null;
  @Input() products: ProductQueryModel[] | null = [];
}
