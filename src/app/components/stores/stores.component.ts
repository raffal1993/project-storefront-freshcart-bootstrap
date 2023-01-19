import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { StoreHomePageQueryModel } from 'src/app/models/store-query.model';
import { StoreTagModel } from '../../models/store.model';
import { StoresService } from '../../services/stores.service';

@Component({
  selector: 'app-stores',
  styleUrls: ['./stores.component.scss'],
  templateUrl: './stores.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent {
  readonly stores$: Observable<StoreHomePageQueryModel[]> = combineLatest([
    this._storesService.getAll(),
    this._storesService.getStoreTags(),
  ]).pipe(
    map(([stores, tags]) =>
      stores.map((store) => ({
        id: store.id,
        name: store.name,
        tags: this._getTags(tags, store.tagIds),
        distanceInMeters: Math.round((store.distanceInMeters / 1000) * 10) / 10,
        logoUrl: store.logoUrl,
      }))
    )
  );

  constructor(private _storesService: StoresService) {}

  private _getTags(tags: StoreTagModel[], tagsId: string[]): string[] {
    const mapTags = tags.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }),
      {}
    ) as Record<string, StoreTagModel>;

    return tagsId.map((id) => mapTags[id].name);
  }
}
