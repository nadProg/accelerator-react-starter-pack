import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { setCatalogGuitars, setCatalogGuitarsStatus, setCurrentGuitar, setCurrentGuitarStatus, setFoundGuitars } from '../store/guitars/guitars-actions';
import { rootReducer } from '../store/root-reducer';

export type State = ReturnType<typeof rootReducer>;

export type Action =
  | ReturnType<typeof setCatalogGuitars>
  | ReturnType<typeof setCatalogGuitarsStatus>
  | ReturnType<typeof setCurrentGuitar>
  | ReturnType<typeof setCurrentGuitarStatus>
  | ReturnType<typeof setFoundGuitars>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  State,
  AxiosInstance,
  Action
>;
