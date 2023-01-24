import { sortOptionsModel } from '../commons/sortOptions';
import { ProductQueryModel } from '../query-models/categories-products-page-query.model';

import { SortOptions } from '../types/sortOptions.type';

export const sortProducts = (
  products: ProductQueryModel[],
  type: SortOptions
) => {
  const option = sortOptionsModel[type].name as keyof ProductQueryModel;
  const dir = sortOptionsModel[type].dir;

  return products.sort((a, b) =>
    dir === 'desc'
      ? a[option] < b[option]
        ? 1
        : -1
      : a[option] > b[option]
      ? 1
      : -1
  );
};
