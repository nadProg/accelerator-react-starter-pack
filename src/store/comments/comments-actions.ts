import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { FetchStatusType } from '../../types/common';

export const setNewCommentStatus = createAction(Action.SetNewCommentStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));
