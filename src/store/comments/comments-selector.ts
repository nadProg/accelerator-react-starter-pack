import { FetchStatusType } from '../../types/common';
import { State } from '../../types/store';

export const getNewCommentStatus = ({ comments }: State): FetchStatusType => comments.newComment.status;
