import { PAGE_TEMPLATE } from '../constants/pagination';

export const parsePageNumber = (pageParam: string) => {
  const [, pageNumber] = pageParam.split(PAGE_TEMPLATE);
  return pageNumber === '' ? NaN : Number(pageNumber);
};

export const getPageParam = (pageNumber: number) =>
  `${PAGE_TEMPLATE}${pageNumber}`;
