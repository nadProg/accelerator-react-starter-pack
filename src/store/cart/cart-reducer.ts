import { createReducer } from '@reduxjs/toolkit';
import { addItemToCart } from './cart-actions';
import { cartInitialState } from './cart-initial-state';

export const cartReducer = createReducer(cartInitialState, (builder) =>
  builder
    .addCase(addItemToCart, (state, action) => {
      state.push({
        product: action.payload.product,
        quantity: 1,
      });
    }),
);
