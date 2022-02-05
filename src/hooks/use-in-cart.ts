import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCartItems } from '../store/cart/cart-selectors';

export const useInCart = (productId: number) => {
  const cartItems = useSelector(getCartItems);

  const inCart = useMemo(() => cartItems.some((cartItem) => cartItem.product.id === productId), [cartItems, productId]);

  return inCart;
};
