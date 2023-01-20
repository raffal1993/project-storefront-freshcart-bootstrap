export interface ProductsQueryModel<T> {
  name: string;
  products: T[];
}

export interface FruitsAndVegetablesProduct {
  name: string;
  price: number;
  imgUrl: string;
}

export interface SnackAndMunchiesProduct {
  name: string;
  price: number;
  imgUrl: string;
}
