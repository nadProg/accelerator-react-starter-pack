import { FetchStatusType } from '../../types/common';
import { State } from '../../types/store';

export const getNewReviewStatus = ({ reviews }: State): FetchStatusType => reviews.newReview.status;
