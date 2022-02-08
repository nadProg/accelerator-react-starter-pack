import { createSelector } from '@reduxjs/toolkit';
import { ONE_HUNDRED_PERCENT } from '../../constants/common';
import { State } from '../../types/store';
import { getDiscountData } from '../coupon/coupon-selectors';

export const getCartItems = ({ cart }: State) => cart.items;

export const getTotalQuantity = createSelector([getCartItems], (cartItems) =>
  cartItems.reduce((totalQuantity, { quantity }) => totalQuantity + quantity, 0),
);

export const getTotalPrice = createSelector([getCartItems], (cartItems) =>
  cartItems
    .map(({ quantity, product: { price } }) => price * quantity)
    .reduce((totalPrice, totalItemPrice) => totalPrice + totalItemPrice, 0),
);


export const getDiscountPrice = createSelector([getTotalPrice, getDiscountData], (totalPrice, discountPercentage) => {
  if (!discountPercentage) {
    return 0;
  }

  return Math.round(totalPrice * discountPercentage / ONE_HUNDRED_PERCENT);
});

export const getTotalPriceWithDiscount = createSelector([getTotalPrice, getDiscountPrice], (totalPrice, discount) =>  totalPrice - discount);
