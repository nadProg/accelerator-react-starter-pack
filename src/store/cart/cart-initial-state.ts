import { CartItem } from '../../types/cart';

type CartState = {
  items: CartItem[],
};

export const cartInitialState: CartState = {
  items: [],
};
