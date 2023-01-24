import { ProductModel } from '../models/product.model';
import { ProductQueryModel } from '../query-models/categories-products-page-query.model';

export const getProductsWithRatingStars = (
  products: ProductModel[]
): ProductQueryModel[] => {
  return products.map((prod) => {
    const fill = Math.floor(prod.ratingValue);
    const half = prod.ratingValue - fill === 0 ? 0 : 1;
    const empty = 5 - fill - half;

    return {
      ...prod,
      ratingStars: {
        fill: Array(fill),
        half: Array(half),
        empty: Array(empty),
      },
    };
  });
};
