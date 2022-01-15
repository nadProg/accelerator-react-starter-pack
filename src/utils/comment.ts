import { CommentGet } from '../types/comment';

export const sortByDate = (comments: CommentGet[]) => {
  const copiedComments = [...comments];

  copiedComments.sort((commentA, commentB) => {
    const dateA = new Date(commentA.createAt);
    const dateB = new Date(commentB.createAt);

    if (dateA === dateB) {
      return 0;
    }

    return dateA < dateB ? 1 : -1;
  });

  return copiedComments;
};
