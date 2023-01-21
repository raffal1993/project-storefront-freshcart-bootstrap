import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-shop-by-category',
  styleUrls: ['./shop-by-category.component.scss'],
  templateUrl: './shop-by-category.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopByCategoryComponent {
  readonly categories$: Observable<CategoryModel[]> =
    this._categoriesService.getAll();

  constructor(private _categoriesService: CategoriesService) {}
}
