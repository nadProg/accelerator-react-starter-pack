import { RUSSIAN_LOCALE } from '../constants/common';
import { Guitar, GuitarWithComments } from '../types/guitar';

const createNameLikeComparingCallback =
  (nameLike: string) =>
  <T extends Guitar>(guitarA: T, guitarB: T) => {
    const indexA = guitarA.name
      .toLocaleLowerCase()
      .indexOf(nameLike.toLocaleLowerCase());
    const indexB = guitarB.name
      .toLocaleLowerCase()
      .indexOf(nameLike.toLocaleLowerCase());
    return indexA - indexB;
  };

export const sortByNameLike = <T extends Guitar>(
  guitars: T[],
  nameLike: string,
): T[] =>
    [...guitars].sort(
      createNameLikeComparingCallback(nameLike.toLocaleLowerCase()),
    );

export const formatPrice = (price: number) =>
  new Intl.NumberFormat(RUSSIAN_LOCALE).format(price);

export const getRating = (guitar: GuitarWithComments | null) => {
  if (!guitar) {
    return 0;
  }

  const { comments } = guitar;

  if (!comments.length) {
    return 0;
  }

  const totalPoints = comments.reduce((sum, comment) => sum + comment.rating, 0);
  return totalPoints / comments.length;
};
