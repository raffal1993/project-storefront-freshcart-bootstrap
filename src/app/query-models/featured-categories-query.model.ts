export interface ProductsQueryModel<T> {
  name: string;
  categoryId: string;
  products: T[];
}

export interface FruitsAndVegetablesProduct {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
}

export interface SnackAndMunchiesProduct {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
}
