import { Guitar } from '../types/guitar';

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
