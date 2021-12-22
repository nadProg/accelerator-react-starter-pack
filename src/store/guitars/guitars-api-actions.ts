import { APIRoute, FetchStatus } from '../../constants/constants';
import { Guitar, ThunkActionResult } from '../../types/types';
import { setCatalogGuitars, setCatalogGuitarsStatus, setCurrentGuitar, setCurrentGuitarStatus } from './guitars-actions';

export const getCatalogGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCatalogGuitarsStatus(FetchStatus.Loading));

    try {
      const { data } = await api.get<Guitar[]>(APIRoute.CatalogGuitars(), {
        params: {
          _embed: 'comments',
          _limit: 9,
          _start: 0,
        },
      });

      dispatch(setCatalogGuitars(data));
      dispatch(setCatalogGuitarsStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setCatalogGuitarsStatus(FetchStatus.Failed));
    }
  };

export const getCurrentGuitar = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCurrentGuitarStatus(FetchStatus.Loading));

    try {
      const { data } = await api.get<Guitar>(APIRoute.Guitar(id), {
        params: {
          _embed: 'comments',
        },
      });

      dispatch(setCurrentGuitar(data));
      dispatch(setCurrentGuitarStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setCurrentGuitarStatus(FetchStatus.Failed));
    }
  };

