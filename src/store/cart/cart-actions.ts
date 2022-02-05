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
