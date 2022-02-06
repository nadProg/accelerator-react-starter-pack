import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { setNewReviewStatus } from '../store/reviews/reviews-actions';
import {
  addFilterGuitarType,
  addFilterStringCount,
  removeFilterGuitarType,
  removeFilterStringCount,
  setFilterMaxPrice,
  setFilterMinPrice
} from '../store/filter/filter-actions';
import {
  addReviewToCurrentGuitar,
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
import { addItemToCart, decreaseItemInCart, deleteItemFromCart, increaseItemInCart } from '../store/cart/cart-actions';

export type State = ReturnType<typeof rootReducer>;

export type ActionType =
  | ReturnType<typeof setCatalogGuitars>
  | ReturnType<typeof setCatalogGuitarsStatus>
  | ReturnType<typeof setCurrentGuitar>
  | ReturnType<typeof setCurrentGuitarStatus>
  | ReturnType<typeof setFoundGuitars>
  | ReturnType<typeof setAllGuitars>
  | ReturnType<typeof setFilterMinPrice>
  | ReturnType<typeof setFilterMaxPrice>
  | ReturnType<typeof addFilterGuitarType>
  | ReturnType<typeof removeFilterGuitarType>
  | ReturnType<typeof addFilterStringCount>
  | ReturnType<typeof removeFilterStringCount>
  | ReturnType<typeof setPaginationCurrentPage>
  | ReturnType<typeof setPaginationMaxPage>
  | ReturnType<typeof setNewReviewStatus>
  | ReturnType<typeof addReviewToCurrentGuitar>
  | ReturnType<typeof addItemToCart>
  | ReturnType<typeof deleteItemFromCart>
  | ReturnType<typeof increaseItemInCart>
  | ReturnType<typeof decreaseItemInCart>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  ActionType
>;
