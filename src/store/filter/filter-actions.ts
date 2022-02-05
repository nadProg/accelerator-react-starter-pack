import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { GuitarType, StringCountType } from '../../types/guitar';

export const setFilterMinPrice = createAction(
  Action.SetFilterMinPrice,
  (minPrice: number | '') => ({
    payload: {
      minPrice,
    },
  }),
);

export const setFilterMaxPrice = createAction(
  Action.SetFilterMaxPrice,
  (maxPrice: number | '') => ({
    payload: {
      maxPrice,
    },
  }),
);

export const addFilterGuitarType = createAction(
  Action.AddFilterGuitarType,
  (guitarType: GuitarType) => ({
    payload: {
      guitarType,
    },
  }),
);

export const removeFilterGuitarType = createAction(
  Action.RemoveFilterGuitarType,
  (guitarType: GuitarType) => ({
    payload: {
      guitarType,
    },
  }),
);

export const addFilterStringCount = createAction(
  Action.AddFilterStringCount,
  (stringCount: StringCountType) => ({
    payload: {
      stringCount,
    },
  }),
);

export const removeFilterStringCount = createAction(
  Action.RemoveFilterStringCount,
  (stringCount: StringCountType) => ({
    payload: {
      stringCount,
    },
  }),
);
