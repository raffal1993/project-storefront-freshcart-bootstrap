import { ProductModel } from '../models/product.model';
import { PriceFilter } from '../types/priceFilter.type';
import { RatingFilter } from '../types/ratingFilter.type';

export const filterProducts = (
  products: ProductModel[],
  catId: string,
  { priceFrom, priceTo }: PriceFilter,
  ratingFiter: RatingFilter,
  storesFilter: string[]
): any => {
  const checkPrice = (prod: ProductModel) => {
    const prFrom = priceFrom || 0;
    const prTo = priceTo || Infinity;

    return (
      prod.price >= Math.max(prod.price, prFrom) &&
      prod.price <= Math.min(prod.price, prTo) &&
      prFrom <= prTo
    );
  };

  // IF THERE IS NO RATING CHECKED RETURN TRUE ELSE FALSE
  const checkRating = (prod: ProductModel) =>
    !Object.values(ratingFiter).includes(true) ||
    ratingFiter[Math.floor(prod.ratingValue) as keyof RatingFilter] ||
    false;

  // IF THERE IS NO STORES CHECKED RETURN TRUE ELSE FALSE
  const checkStores = (prod: ProductModel) =>
    storesFilter.length === 0 ||
    storesFilter.every((storeFilterId) =>
      prod.storeIds.includes(storeFilterId)
    );

  return products.filter(
    (prod) =>
      prod.categoryId === catId &&
      checkPrice(prod) &&
      checkRating(prod) &&
      checkStores(prod)
  );
};
