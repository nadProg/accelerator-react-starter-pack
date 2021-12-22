import { APIRoute, FetchStatus } from '../../constants/constants';
import { Guitar, ThunkActionResult } from '../../types/types';
import { setCatalogGuitars, setCatalogGuitarsStatus } from './guitars-actions';

export const getCatalogGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCatalogGuitarsStatus(FetchStatus.Loading));

    try {
      const { data } = await api.get<Guitar[]>(APIRoute.CatalogGuitars());

      dispatch(setCatalogGuitars(data));
      dispatch(setCatalogGuitarsStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setCatalogGuitarsStatus(FetchStatus.Failed));
    }
  };
