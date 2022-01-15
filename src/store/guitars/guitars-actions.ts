import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { CommentGet } from '../../types/comment';
import { FetchStatusType } from '../../types/common';
import { Guitar, GuitarWithComments } from '../../types/guitar';

export const setCatalogGuitars = createAction(Action.SetCatalogGuitars, (catalogGuitars: GuitarWithComments[] | null) => ({
  payload: {
    catalogGuitars,
  },
}));

export const setCatalogGuitarsStatus = createAction(Action.SetCatalogGuitarsStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setCurrentGuitar = createAction(Action.SetCurrentGuitar, (currentGuitar: GuitarWithComments | null) => ({
  payload: {
    currentGuitar,
  },
}));

export const addCommentToCurrentGuitar = createAction(Action.AddNewCommentToCurrentGuitar, (comment: CommentGet) => ({
  payload: {
    comment,
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
