import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { GuitarType, StringCountType } from '../../types/guitar';

export const SetFilterMinPrice = createAction(
  Action.SetFilterMinPrice,
  (minPrice: number | '') => ({
    payload: {
      minPrice,
    },
  }),
);

export const SetFilterMaxPrice = createAction(
  Action.SetFilterMaxPrice,
  (maxPrice: number | '') => ({
    payload: {
      maxPrice,
    },
  }),
);

export const AddFilterGuitarType = createAction(
  Action.AddFilterGuitarType,
  (guitarType: GuitarType) => ({
    payload: {
      guitarType,
    },
  }),
);

export const RemoveFilterGuitarType = createAction(
  Action.RemoveFilterGuitarType,
  (guitarType: GuitarType) => ({
    payload: {
      guitarType,
    },
  }),
);

export const AddFilterStringCount = createAction(
  Action.AddFilterStringCount,
  (stringCount: StringCountType) => ({
    payload: {
      stringCount,
    },
  }),
);

export const RemoveFilterStringCount = createAction(
  Action.RemoveFilterStringCount,
  (stringCount: StringCountType) => ({
    payload: {
      stringCount,
    },
  }),
);
