import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly categories$: Observable<CategoryModel[]> =
    this._categoriesService.getAll();

  private _isCollapsedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public isCollapsed$: Observable<boolean> =
    this._isCollapsedSubject.asObservable();

  constructor(private _categoriesService: CategoriesService) {}

  onClickHamburgerMenu(type?: string): void {
    this._isCollapsedSubject.next(
      type === 'close' ? true : !this._isCollapsedSubject.value
    );
  }
}
