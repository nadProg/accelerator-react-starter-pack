import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
  AddFilterGuitarType,
  AddFilterStringCount,
  RemoveFilterGuitarType,
  RemoveFilterStringCount,
  SetFilterMaxPrice,
  SetFilterMinPrice
} from '../store/filter/filter-actions';
import {
  setAllGuitars,
  setCatalogGuitars,
  setCatalogGuitarsStatus,
  setCurrentGuitar,
  setCurrentGuitarStatus,
  setFoundGuitars
} from '../store/guitars/guitars-actions';
import {
  setPaginationCurrentPage,
  setPaginationMaxPage
} from '../store/pagination/pagination-actions';
import { rootReducer } from '../store/root-reducer';

export type State = ReturnType<typeof rootReducer>;

export type ActionType =
  | ReturnType<typeof setCatalogGuitars>
  | ReturnType<typeof setCatalogGuitarsStatus>
  | ReturnType<typeof setCurrentGuitar>
  | ReturnType<typeof setCurrentGuitarStatus>
  | ReturnType<typeof setFoundGuitars>
  | ReturnType<typeof setAllGuitars>
  | ReturnType<typeof SetFilterMinPrice>
  | ReturnType<typeof SetFilterMaxPrice>
  | ReturnType<typeof AddFilterGuitarType>
  | ReturnType<typeof RemoveFilterGuitarType>
  | ReturnType<typeof AddFilterStringCount>
  | ReturnType<typeof RemoveFilterStringCount>
  | ReturnType<typeof setPaginationCurrentPage>
  | ReturnType<typeof setPaginationMaxPage>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  ActionType
>;
