import { FetchStatus } from '../../constants/common';
import { APIRoute } from '../../constants/endpoints';
import { CATALOG_PAGE_SIZE } from '../../constants/guitar';
import { Query, COMMENTS, NAME_LIKE_QUERY } from '../../constants/query';
import { Guitar, GuitarWithComments } from '../../types/guitar';
import { ThunkActionResult } from '../../types/store';
import {
  setCatalogGuitars,
  setCatalogGuitarsStatus,
  setCurrentGuitar,
  setCurrentGuitarStatus,
  setFoundGuitars
} from './guitars-actions';

export const getCatalogGuitars =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(setCatalogGuitarsStatus(FetchStatus.Loading));

      try {
        const { data } = await api.get<GuitarWithComments[]>(APIRoute.CatalogGuitars(), {
          params: {
            [Query.Embed]: COMMENTS,
            [Query.Limit]: CATALOG_PAGE_SIZE,
            [Query.Sort]: _getState().sort.type,
            [Query.Order]: _getState().sort.order,
          },
        });

        dispatch(setCatalogGuitars(data));
        dispatch(setCatalogGuitarsStatus(FetchStatus.Succeeded));
      } catch (error) {
        dispatch(setCatalogGuitarsStatus(FetchStatus.Failed));
      }
    };

export const getCurrentGuitar =
  (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(setCurrentGuitarStatus(FetchStatus.Loading));

      try {
        const { data } = await api.get<GuitarWithComments>(APIRoute.Guitar(id), {
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

export const getGuitarsSimilarToName =
  (name: string): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(APIRoute.CatalogGuitars(), {
          params: {
            [NAME_LIKE_QUERY]: name,
          },
        });

        dispatch(setFoundGuitars(data));
      } catch {
        dispatch(setFoundGuitars(null));
      }
    };
