import { ProductQueryModel } from '../query-models/categories-products-page-query.model';
import { SortOptions } from '../types/sortOptions.type';

export const sortProducts = (
  products: ProductQueryModel[],
  type: SortOptions
) => {
  switch (type) {
    case 'Featured':
      return products.sort((a, b) =>
        a.featureValue < b.featureValue ? 1 : -1
      );
    case 'Avg. Rating':
      return products.sort((a, b) => (a.ratingValue > b.ratingValue ? -1 : 1));
    case 'Price: High to Low':
      return products.sort((a, b) => (a.price > b.price ? -1 : 1));
    case 'Price: Low to High':
      return products.sort((a, b) => (a.price > b.price ? 1 : -1));
  }
};
