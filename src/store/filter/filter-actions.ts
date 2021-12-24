import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action';
import { GuitarType, StringCountType } from '../../types/guitar';

export const SetFilterMinPrice = createAction(
  ActionType.SetFilterMinPrice,
  (minPrice: number | '') => ({
    payload: {
      minPrice,
    },
  }),
);

export const SetFilterMaxPrice = createAction(
  ActionType.SetFilterMaxPrice,
  (maxPrice: number | '') => ({
    payload: {
      maxPrice,
    },
  }),
);

export const AddFilterGuitarType = createAction(
  ActionType.AddFilterGuitarType,
  (guitarType: GuitarType) => ({
    payload: {
      guitarType,
    },
  }),
);

export const RemoveFilterGuitarType = createAction(
  ActionType.RemoveFilterGuitarType,
  (guitarType: GuitarType) => ({
    payload: {
      guitarType,
    },
  }),
);

export const AddFilterStringCount = createAction(
  ActionType.AddFilterStringCount,
  (stringCount: StringCountType) => ({
    payload: {
      stringCount,
    },
  }),
);

export const RemoveFilterStringCount = createAction(
  ActionType.RemoveFilterStringCount,
  (stringCount: StringCountType) => ({
    payload: {
      stringCount,
    },
  }),
);
