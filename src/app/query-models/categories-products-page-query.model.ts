export interface CategoryQueryModel {
  name: string;
  imageUrl: string;
  id: string;
}

export interface ProductQueryModel {
  name: string;
  price: number;
  categoryId: string;
  ratingValue: number;
  ratingCount: number;
  ratingStars: RatingStars;
  imageUrl: string;
  featureValue: number;
  storeIds: string[];
  id: string;
}

interface RatingStars {
  fill: any[];
  half: any[];
  empty: any[];
}
