import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/store';

export const getCartItems = ({ cart }: State) => cart;

export const getTotalQuantity = createSelector([getCartItems], (cartItems) =>
  cartItems.reduce((totalQuantity, { quantity }) => totalQuantity + quantity, 0),
);

export const getTotalPrice = createSelector([getCartItems], (cartItems) =>
  cartItems
    .map(({ quantity, product: { price } }) => price * quantity)
    .reduce((totalPrice, totalItemPrice) => totalPrice + totalItemPrice),
);
