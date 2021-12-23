import { useParams } from 'react-router-dom';
import { ParamsWithId } from '../types/common';

type useIdParamResult = {
  id?: number,
  error?: Error,
}

export const useIdParam = (): useIdParamResult => {
  const { id } = useParams() as ParamsWithId;

  if (!id) {
    return ({
      error: new Error('Id param does not exist'),
    });
  }

  const parsedId = Number(id);

  if (Number.isNaN(parsedId)) {
    return ({
      error: new Error('Id is not valid'),
    });
  }

  return ({
    id: parsedId,
  });
};

