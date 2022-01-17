import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { FetchStatusType } from '../../types/common';

export const setNewReviewStatus = createAction(Action.SetNewReviewStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));
