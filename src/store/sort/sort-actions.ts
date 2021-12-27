import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { OrderType, SortType } from '../../types/sort';

export const SetSortType = createAction(Action.SetSortType, (type: SortType) => ({
  payload: {
    type,
  },
}));

export const setSortOrder = createAction(Action.SetSortOrder, (order: OrderType) => ({
  payload: {
    order,
  },
}));
