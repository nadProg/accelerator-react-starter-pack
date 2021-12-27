import { CATALOG_PAGE_SIZE, TOTAL_COUNT_HEADER } from '../../constants/pagination';
import { FetchStatus } from '../../constants/common';
import { APIRoute } from '../../constants/endpoints';
import { FilterParameter } from '../../constants/filter';
import { Query, COMMENTS } from '../../constants/query';
import { NAME_LIKE_QUERY } from '../../constants/search';
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
import { setPaginationMaxPage } from '../pagination/pagination-actions';

export const getCatalogGuitars =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(setCatalogGuitarsStatus(FetchStatus.Loading));

      const minPrice = _getState().filter.price.min === '' ? undefined : _getState().filter.price.min;
      const maxPrice = _getState().filter.price.max === '' ? undefined : _getState().filter.price.max;

      try {
        const response = await api.get<GuitarWithComments[]>(APIRoute.CatalogGuitars(), {
          params: {
            [Query.Embed]: COMMENTS,
            [Query.Limit]: CATALOG_PAGE_SIZE,
            [Query.Start]: (_getState().pagination.currentPage - 1) * CATALOG_PAGE_SIZE,
            [Query.Sort]: _getState().sort.type,
            [Query.Order]: _getState().sort.order,
            [FilterParameter.MinPrice]: minPrice,
            [FilterParameter.MaxPrice]: maxPrice,
            [FilterParameter.Type]: _getState().filter.types,
            [FilterParameter.StringCount]: _getState().filter.stringCounts,
          },
        });

        const maxPage = Math.ceil(response.headers[TOTAL_COUNT_HEADER] / CATALOG_PAGE_SIZE);
        dispatch(setPaginationMaxPage(maxPage));

        dispatch(setCatalogGuitars(response.data));
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
