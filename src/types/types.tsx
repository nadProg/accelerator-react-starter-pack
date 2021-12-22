import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { FetchStatus, GuitarType } from '../constants/constants';
import {
  setCatalogGuitars,
  setCatalogGuitarsStatus
} from '../store/guitars/guitars-actions';
import { rootReducer } from '../store/root-reducer';

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: ValuesOf<typeof GuitarType>;
  description: string;
  previewImg: string;
  stringCount: 4 | 6 | 7 | 12;
  rating: number;
  price: number;
  comments?: Comment[];
};

export type Comment = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: 1;
};

export type ValuesOf<T> = T[keyof T];

export type FetchedData<T = any> = {
  data: T | null;
  status: FetchStatusType;
};

export type FetchStatusType = ValuesOf<typeof FetchStatus>;

export type State = ReturnType<typeof rootReducer>;

export type Action =
  | ReturnType<typeof setCatalogGuitars>
  | ReturnType<typeof setCatalogGuitarsStatus>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action
>;
