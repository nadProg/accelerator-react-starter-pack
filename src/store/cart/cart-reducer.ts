import { createReducer } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cart';
import { addItemToCart, decreaseItemInCart, deleteItemFromCart, increaseItemInCart } from './cart-actions';
import { cartInitialState } from './cart-initial-state';

export const cartReducer = createReducer(cartInitialState, (builder) =>
  builder
    .addCase(addItemToCart, (state, action) => {
      state.items.push({
        product: action.payload.product,
        quantity: 1,
      });
    })
    .addCase(deleteItemFromCart, (state, action) => {
      const itemIndex = state.items.findIndex(({product}) => product.id === action.payload.productId);
      state.items.splice(itemIndex, 1);
    })
    .addCase(increaseItemInCart, (state, action) => {
      const itemIndex = state.items.findIndex(({product}) => product.id === action.payload.productId);
      const increasedItem: CartItem = {
        ...state.items[itemIndex],
        quantity: state.items[itemIndex].quantity + 1,
      };
      state.items.splice(itemIndex, 1, increasedItem);
    })
    .addCase(decreaseItemInCart, (state, action) => {
      const itemIndex = state.items.findIndex(({product}) => product.id === action.payload.productId);
      const increasedItem: CartItem = {
        ...state.items[itemIndex],
        quantity: state.items[itemIndex].quantity - 1,
      };
      state.items.splice(itemIndex, 1, increasedItem);
    }),
);
