import { FetchStatus } from '../../constants/common';
import { APIRoute } from '../../constants/endpoints';
import { CommentGet, CommentPost } from '../../types/comment';
import { ThunkActionResult } from '../../types/store';
import { addCommentToCurrentGuitar } from '../guitars/guitars-actions';
import { setNewCommentStatus } from './comments-actions';

export const postComment =
  (postData: CommentPost): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(setNewCommentStatus(FetchStatus.Loading));

      try {
        const { data } = await api.post<CommentGet>(APIRoute.Comment(), postData);

        dispatch(addCommentToCurrentGuitar(data));
        dispatch(setNewCommentStatus(FetchStatus.Succeeded));
      } catch (error) {
        dispatch(setNewCommentStatus(FetchStatus.Failed));
      }
    };
