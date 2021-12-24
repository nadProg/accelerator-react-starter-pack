import { createReducer } from '@reduxjs/toolkit';
import {
  AddFilterGuitarType,
  AddFilterStringCount,
  RemoveFilterGuitarType,
  RemoveFilterStringCount,
  SetFilterMaxPrice,
  SetFilterMinPrice
} from './filter-actions';
import { filterInitialState } from './filter-initial-state';

export const filterReducer = createReducer(filterInitialState, (builder) =>
  builder
    .addCase(AddFilterGuitarType, (state, action) => {
      state.types.push(action.payload.guitarType);
    })
    .addCase(RemoveFilterGuitarType, (state, action) => {
      state.types = state.types.filter(
        (type) => type !== action.payload.guitarType,
      );
    })
    .addCase(AddFilterStringCount, (state, action) => {
      state.stringCounts.push(action.payload.stringCount);
    })
    .addCase(RemoveFilterStringCount, (state, action) => {
      state.stringCounts = state.stringCounts.filter(
        (stringCount) => stringCount !== action.payload.stringCount,
      );
    })
    .addCase(SetFilterMinPrice, (state, action) => {
      state.price.min = action.payload.minPrice;
    })
    .addCase(SetFilterMaxPrice, (state, action) => {
      state.price.max = action.payload.maxPrice;
    }),
);
