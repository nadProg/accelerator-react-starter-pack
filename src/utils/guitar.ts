import { RUSSIAN_LOCALE } from '../constants/common';
import { Guitar, GuitarWithReviews } from '../types/guitar';

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

export const getRating = (guitar: GuitarWithReviews | null) => {
  if (!guitar) {
    return 0;
  }

  const { comments: reviews } = guitar;

  if (!reviews.length) {
    return 0;
  }

  const totalPoints = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalPoints / reviews.length;
};
