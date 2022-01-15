import { useMemo, useState } from 'react';

type UseShowMoreConfig<T> = {
  items: Array<T>;
  size?: number;
  start?: number;
};

type UseShowMoreReturn<T> = {
  isMore: boolean;
  showMore: () => void;
  shownItems: Array<T>;
};

export const useShowMore = <T>({
  items,
  start = 1,
  size = 1,
}: UseShowMoreConfig<T>): UseShowMoreReturn<T> => {
  const [currentPage, setCurrentPage] = useState(start);

  const showMore = () => setCurrentPage((prevPage) => prevPage + 1);

  const isMore = items.length > currentPage * size;

  const shownItems = useMemo(
    () => items.slice(0, currentPage * size),
    [items, currentPage, size],
  );

  return {
    isMore,
    showMore,
    shownItems,
  };
};
