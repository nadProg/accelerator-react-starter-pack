import { Guitar } from './guitar';

export type CartItem<T extends Guitar = Guitar> = {
  product: T;
  quantity: number;
};
