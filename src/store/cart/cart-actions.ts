import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { Guitar } from '../../types/guitar';

export const addItemToCart = createAction(
  Action.AddItemToCart,
  (product: Guitar) => ({
    payload: {
      product,
    },
  }),
);

export const deleteItemFromCart = createAction(
  Action.DeleteItemFromCart,
  (productId: Guitar['id']) => ({
    payload: {
      productId,
    },
  }),
);

export const increaseItemInCart = createAction(
  Action.IncreaseItemInCart,
  (productId: Guitar['id']) => ({
    payload: {
      productId,
    },
  }),
);

export const decreaseItemInCart = createAction(
  Action.DecreaseItemInCart,
  (productId: Guitar['id']) => ({
    payload: {
      productId,
    },
  }),
);

export const setCartItemQuantity = createAction(
  Action.SetCartItemQuantity,
  (productId: Guitar['id'], quantity: number) => ({
    payload: {
      productId,
      quantity,
    },
  }),
);
