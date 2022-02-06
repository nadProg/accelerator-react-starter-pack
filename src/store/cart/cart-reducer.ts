import { createReducer } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cart';
import { addItemToCart, decreaseItemInCart, deleteItemFromCart, increaseItemInCart } from './cart-actions';
import { cartInitialState } from './cart-initial-state';

export const cartReducer = createReducer(cartInitialState, (builder) =>
  builder
    .addCase(addItemToCart, (state, action) => {
      const itemIndex = state.items.findIndex(({product}) => product.id === action.payload.product.id);

      if (itemIndex !== -1) {
        throw new Error(`The product with id ${action.payload.product.id} is already in the cart`);
      }

      state.items.push({
        product: action.payload.product,
        quantity: 1,
      });
    })
    .addCase(deleteItemFromCart, (state, action) => {
      const itemIndex = state.items.findIndex(({product}) => product.id === action.payload.productId);

      if (itemIndex === -1) {
        throw new Error(`The product with id ${action.payload.productId} is absent in the cart`);
      }

      state.items.splice(itemIndex, 1);
    })
    .addCase(increaseItemInCart, (state, action) => {
      const itemIndex = state.items.findIndex(({product}) => product.id === action.payload.productId);

      if (itemIndex === -1) {
        throw new Error(`The product with id ${action.payload.productId} is absent in the cart`);
      }

      const increasedItem: CartItem = {
        ...state.items[itemIndex],
        quantity: state.items[itemIndex].quantity + 1,
      };

      state.items.splice(itemIndex, 1, increasedItem);
    })
    .addCase(decreaseItemInCart, (state, action) => {
      const itemIndex = state.items.findIndex(({product}) => product.id === action.payload.productId);

      if (itemIndex === -1) {
        throw new Error(`The product with id ${action.payload.productId} is absent in the cart`);
      }

      const increasedItem: CartItem = {
        ...state.items[itemIndex],
        quantity: state.items[itemIndex].quantity - 1,
      };

      state.items.splice(itemIndex, 1, increasedItem);
    }),
);
