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
