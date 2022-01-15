import { FetchStatus } from '../../constants/common';
import { FetchStatusType } from '../../types/common';

export type GuitarsState = {
  newComment: {
    status: FetchStatusType
  },
};

export const commentsInitialState: GuitarsState = {
  newComment: {
    status: FetchStatus.Idle,
  },
};
