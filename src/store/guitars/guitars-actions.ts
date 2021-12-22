import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/constants';
import { FetchStatusType, Guitar } from '../../types/types';

export const setCatalogGuitars = createAction(ActionType.SetCatalogGuitars, (catalogGuitars: Guitar[] | null) => ({
  payload: {
    catalogGuitars,
  },
}));

export const setCatalogGuitarsStatus = createAction(ActionType.SetCatalogGuitarsStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setCurrentGuitar = createAction(ActionType.SetCurrentGuitar, (currentGuitar: Guitar | null) => ({
  payload: {
    currentGuitar,
  },
}));

export const setCurrentGuitarStatus = createAction(ActionType.SetCurrentGuitarStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));
