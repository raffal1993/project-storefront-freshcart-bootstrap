import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-products-content',
  styleUrls: ['./products-content.component.scss'],
  templateUrl: './products-content.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsContentComponent {
  @Input() category$: Observable<CategoryModel | undefined> = of();
}
