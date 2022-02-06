import { Guitar } from './guitar';

export type Product<T extends Guitar = Guitar> = T;

export type CartItem = {
  product: Product;
  quantity: number;
};
