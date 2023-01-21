import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductsComponent {
  readonly categories$: Observable<CategoryModel[]> = this._categoriesService
    .getAll()
    .pipe(shareReplay(1));

  readonly category$: Observable<CategoryModel | undefined> = combineLatest([
    this.categories$,
    this._activatedRoute.params.pipe(map((params) => params['categoryId'])),
  ]).pipe(
    map(([categories, categoryId]) =>
      categories.find((cat) => cat.id === categoryId)
    )
  );
  constructor(
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute
  ) {}
}
