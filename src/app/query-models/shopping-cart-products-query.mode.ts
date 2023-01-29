import { ProductModel } from '../models/product.model';
import { ShoppingCartProduct } from '../types/userProducts';

export interface ShoppingCartQueryModel
  extends ProductModel,
    Pick<ShoppingCartProduct, 'quantity'> {}
