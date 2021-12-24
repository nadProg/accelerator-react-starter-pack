import { FetchStatus } from '../../constants/common';
import { APIRoute } from '../../constants/endpoints';
import { CATALOG_PAGE_SIZE } from '../../constants/guitar';
import { Query, COMMENTS, NAME_LIKE_QUERY, PriceQuery } from '../../constants/query';
import { Guitar, GuitarWithComments } from '../../types/guitar';
import { ThunkActionResult } from '../../types/store';
import {
  setAllGuitars,
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

      const minPrice = _getState().filter.price.min === '' ? undefined : _getState().filter.price.min;
      const maxPrice = _getState().filter.price.max === '' ? undefined : _getState().filter.price.max;

      try {
        const { data } = await api.get<GuitarWithComments[]>(APIRoute.CatalogGuitars(), {
          params: {
            [Query.Embed]: COMMENTS,
            [Query.Limit]: CATALOG_PAGE_SIZE,
            [Query.Sort]: _getState().sort.type,
            [Query.Order]: _getState().sort.order,
            [PriceQuery.Min]: minPrice,
            [PriceQuery.Max]: maxPrice,
            type: _getState().filter.types,
            stringCount: _getState().filter.stringCounts,
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

export const getAllGuitars =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const { data } = await api.get<Guitar[]>(APIRoute.CatalogGuitars());

        dispatch(setAllGuitars(data));
      } catch {
        dispatch(setAllGuitars(null));
      }
    };
