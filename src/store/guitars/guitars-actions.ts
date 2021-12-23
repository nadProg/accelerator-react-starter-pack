import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action';
import { FetchStatusType } from '../../types/common';
import { Guitar, GuitarWithComments } from '../../types/guitar';

export const setCatalogGuitars = createAction(ActionType.SetCatalogGuitars, (catalogGuitars: GuitarWithComments[] | null) => ({
  payload: {
    catalogGuitars,
  },
}));

export const setCatalogGuitarsStatus = createAction(ActionType.SetCatalogGuitarsStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setCurrentGuitar = createAction(ActionType.SetCurrentGuitar, (currentGuitar: GuitarWithComments | null) => ({
  payload: {
    currentGuitar,
  },
}));

export const setCurrentGuitarStatus = createAction(ActionType.SetCurrentGuitarStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setFoundGuitars = createAction(ActionType.SetFoundGuitars, (foundGuitars: Guitar[] | null) => ({
  payload: {
    foundGuitars,
  },
}));
