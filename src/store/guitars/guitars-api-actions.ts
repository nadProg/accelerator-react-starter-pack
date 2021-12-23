import { APIRoute, CATALOG_PAGE_SIZE, COMMENTS, FetchStatus, NAME_LIKE_QUERY, Query } from '../../constants/constants';
import { Guitar, ThunkActionResult } from '../../types/types';
import { setCatalogGuitars, setCatalogGuitarsStatus, setCurrentGuitar, setCurrentGuitarStatus, setFoundGuitars } from './guitars-actions';

export const getCatalogGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCatalogGuitarsStatus(FetchStatus.Loading));

    try {
      const { data } = await api.get<Guitar[]>(APIRoute.CatalogGuitars(), {
        params: {
          [Query.Embed]: COMMENTS,
          [Query.Limit]: CATALOG_PAGE_SIZE,
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
          [Query.Embed]: COMMENTS,
        },
      });

      dispatch(setCurrentGuitar(data));
      dispatch(setCurrentGuitarStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setCurrentGuitarStatus(FetchStatus.Failed));
    }
  };

export const getGuitarsSimilarToName = (name: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Guitar[]>(APIRoute.CatalogGuitars(), {
      params: {
        [NAME_LIKE_QUERY]: name,
      },
    });

    dispatch(setFoundGuitars(data));
  };
