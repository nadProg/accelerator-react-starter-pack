import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/store';

export const getCartItems = ({ cart }: State) => cart.items;

export const getTotalQuantity = createSelector([getCartItems], (cartItems) => {
  const total = cartItems.reduce(
    (totalQuantity, { quantity }) => totalQuantity + quantity,
    0,
  );
  return total;
});

export const getTotalPrice = createSelector([getCartItems], (cartItems) => {
  const total = cartItems
    .map(({ quantity, product: { price } }) => price * quantity)
    .reduce((totalPrice, totalItemPrice) => totalPrice + totalItemPrice, 0);
  return total;
});
