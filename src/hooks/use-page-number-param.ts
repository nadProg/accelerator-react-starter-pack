import { useParams } from 'react-router-dom';
import { ParamsWithPage } from '../types/common';
import { parsePageNumber } from '../utils/pagination';

type usePageParamResult = {
  pageNumber?: number,
  error?: Error,
}

export const usePageNumberParam = (): usePageParamResult => {
  const { page } = useParams() as ParamsWithPage;

  if (!page) {
    return ({
      error: new Error('Page param does not exist'),
    });
  }

  const parsedPageNumber = parsePageNumber(page);

  if (Number.isNaN(parsedPageNumber)) {
    return ({
      error: new Error('Page is not valid'),
    });
  }

  return ({
    pageNumber: parsedPageNumber,
  });
};

