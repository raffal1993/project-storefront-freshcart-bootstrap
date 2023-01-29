export interface ShoppingCartProduct {
  id: string;
  quantity: number;
}

export type DataFromLS<T extends 'wishlistIds' | 'shoppingCartIds'> =
  T extends 'wishlistIds' ? string[] : ShoppingCartProduct[];
