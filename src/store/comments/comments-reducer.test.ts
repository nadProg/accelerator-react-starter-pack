import { UNKNOWN_ACTION } from '../../constants/action';
import { FetchStatus } from '../../constants/common';
import { setNewCommentStatus } from './comments-actions';
import { commentsInitialState } from './comments-initial-state';
import { commentsReducer } from './comments-reducer';

describe('Reducer: Comments', () => {
  it('without additional parameters should return initial state', () => {
    expect(commentsReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(commentsInitialState);
  });

  it('should set new comment fetch status', () => {
    expect(commentsReducer(commentsInitialState, setNewCommentStatus(FetchStatus.Succeeded)))
      .toEqual({
        ...commentsInitialState,
        newComment: {
          status: FetchStatus.Succeeded,
        },
      });
  });
});
