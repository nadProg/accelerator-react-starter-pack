import { FetchStatus } from '../../constants/common';
import { APIRoute } from '../../constants/endpoints';
import { ReviewGet, ReviewPost } from '../../types/review';
import { ThunkActionResult } from '../../types/store';
import { addReviewToCurrentGuitar } from '../guitars/guitars-actions';
import { setNewReviewStatus } from './reviews-actions';

export const postReview =
  (postData: ReviewPost): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(setNewReviewStatus(FetchStatus.Loading));

      try {
        const { data: newReview } = await api.post<ReviewGet>(APIRoute.Reviews(), postData);

        dispatch(addReviewToCurrentGuitar(newReview));
        dispatch(setNewReviewStatus(FetchStatus.Succeeded));
      } catch (error) {
        dispatch(setNewReviewStatus(FetchStatus.Failed));
      }
    };
