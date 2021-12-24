import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action';
import { OrderType, SortType } from '../../types/sort';

export const SetSortType = createAction(ActionType.SetSortType, (type: SortType) => ({
  payload: {
    type,
  },
}));

export const setSortOrder = createAction(ActionType.SetSortOrder, (order: OrderType) => ({
  payload: {
    order,
  },
}));
