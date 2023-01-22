import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CategoryProductsPageQueryModel } from 'src/app/query-models/categories-products-page-query.model';

@Component({
  selector: 'app-products-sidebar',
  styleUrls: ['./products-sidebar.component.scss'],
  templateUrl: './products-sidebar.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsSidebarComponent {
  @Input() categories: CategoryProductsPageQueryModel[] | null = [];
}
