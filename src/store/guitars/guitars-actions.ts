import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { ReviewGet } from '../../types/review';
import { FetchStatusType } from '../../types/common';
import { Guitar, GuitarWithReviews } from '../../types/guitar';

export const setCatalogGuitars = createAction(Action.SetCatalogGuitars, (catalogGuitars: GuitarWithReviews[] | null) => ({
  payload: {
    catalogGuitars,
  },
}));

export const setCatalogGuitarsStatus = createAction(Action.SetCatalogGuitarsStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setCurrentGuitar = createAction(Action.SetCurrentGuitar, (currentGuitar: GuitarWithReviews | null) => ({
  payload: {
    currentGuitar,
  },
}));

export const addReviewToCurrentGuitar = createAction(Action.AddReviewToCurrentGuitar, (review: ReviewGet) => ({
  payload: {
    review,
  },
}));

export const setCurrentGuitarStatus = createAction(Action.SetCurrentGuitarStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setFoundGuitars = createAction(Action.SetFoundGuitars, (foundGuitars: Guitar[] | null) => ({
  payload: {
    foundGuitars,
  },
}));

export const setAllGuitars = createAction(Action.SetAllGuitars, (allGuitars: Guitar[] | null) => ({
  payload: {
    allGuitars,
  },
}));
