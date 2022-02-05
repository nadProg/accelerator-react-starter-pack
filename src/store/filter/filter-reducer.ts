import { createReducer } from '@reduxjs/toolkit';
import {
  addFilterGuitarType,
  addFilterStringCount,
  removeFilterGuitarType,
  removeFilterStringCount,
  setFilterMaxPrice,
  setFilterMinPrice
} from './filter-actions';
import { filterInitialState } from './filter-initial-state';

export const filterReducer = createReducer(filterInitialState, (builder) =>
  builder
    .addCase(addFilterGuitarType, (state, action) => {
      state.types.push(action.payload.guitarType);
    })
    .addCase(removeFilterGuitarType, (state, action) => {
      state.types = state.types.filter(
        (type) => type !== action.payload.guitarType,
      );
    })
    .addCase(addFilterStringCount, (state, action) => {
      state.stringCounts.push(action.payload.stringCount);
    })
    .addCase(removeFilterStringCount, (state, action) => {
      state.stringCounts = state.stringCounts.filter(
        (stringCount) => stringCount !== action.payload.stringCount,
      );
    })
    .addCase(setFilterMinPrice, (state, action) => {
      state.price.min = action.payload.minPrice;
    })
    .addCase(setFilterMaxPrice, (state, action) => {
      state.price.max = action.payload.maxPrice;
    }),
);
