import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../../services/api';
import { Action, State } from '../../types/store';
import MockAdapter from 'axios-mock-adapter';
import { APIRoute } from '../../constants/endpoints';
import { datatype, lorem } from 'faker';
import {
  createMockGuitar,
  createMockGuitarWithComments
} from '../../mock/guitar';
import { createArrayOfObjects } from '../../utils/common';
import {
  getAllGuitars,
  getCatalogGuitars,
  getCurrentGuitar,
  getGuitarsSimilarToName
} from './guitars-api-actions';
import { FetchStatus } from '../../constants/common';
import {
  setAllGuitars,
  setCatalogGuitars,
  setCatalogGuitarsStatus,
  setCurrentGuitar,
  setCurrentGuitarStatus,
  setFoundGuitars
} from './guitars-actions';
import thunk from 'redux-thunk';
import { createMockState } from '../../mock/state';
import { setPaginationMaxPage } from '../pagination/pagination-actions';
import { CATALOG_PAGE_SIZE, TOTAL_COUNT_HEADER } from '../../constants/pagination';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const createMockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockGuitarName = lorem.word();
const mockGuitarId = datatype.number();
const mockCatalogGuitars = createArrayOfObjects(
  createMockGuitarWithComments,
  10,
);
const mockCurrentGuitar = createMockGuitarWithComments();
const mockFoundGuitars = createArrayOfObjects(createMockGuitar, 10);

describe('Api-actions: Guitars', () => {
  it('should handle succeed get catalog guitars request', async () => {
    const mockState = createMockState();
    const store = createMockStore(mockState);
    const mockTotalCount = datatype.number();

    mockAPI.onGet(APIRoute.CatalogGuitars()).reply(200, mockCatalogGuitars, {
      [TOTAL_COUNT_HEADER]: mockTotalCount,
    });

    await store.dispatch(getCatalogGuitars());

    expect(store.getActions()).toEqual([
      setCatalogGuitarsStatus(FetchStatus.Loading),
      setPaginationMaxPage(Math.ceil(mockTotalCount / CATALOG_PAGE_SIZE)),
      setCatalogGuitars(mockCatalogGuitars),
      setCatalogGuitarsStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed get catalog guitars request', async () => {
    const mockState = createMockState();
    const store = createMockStore(mockState);
    mockAPI.onGet(APIRoute.CatalogGuitars()).reply(400);

    await store.dispatch(getCatalogGuitars());

    expect(store.getActions()).toEqual([
      setCatalogGuitarsStatus(FetchStatus.Loading),
      setCatalogGuitarsStatus(FetchStatus.Failed),
    ]);
  });

  it('should handle succeed get current guitar request', async () => {
    const store = createMockStore();
    mockAPI.onGet(APIRoute.Guitar(mockGuitarId)).reply(200, mockCurrentGuitar);

    await store.dispatch(getCurrentGuitar(mockGuitarId));

    expect(store.getActions()).toEqual([
      setCurrentGuitarStatus(FetchStatus.Loading),
      setCurrentGuitar(mockCurrentGuitar),
      setCurrentGuitarStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed get current guitar request', async () => {
    const store = createMockStore();
    mockAPI.onGet(APIRoute.Guitar(mockGuitarId)).reply(400);

    await store.dispatch(getCurrentGuitar(mockGuitarId));

    expect(store.getActions()).toEqual([
      setCurrentGuitarStatus(FetchStatus.Loading),
      setCurrentGuitarStatus(FetchStatus.Failed),
    ]);
  });

  it('should handle succeed get found guitars request', async () => {
    const store = createMockStore();
    mockAPI.onGet(APIRoute.CatalogGuitars()).reply(200, mockFoundGuitars);

    await store.dispatch(getGuitarsSimilarToName(mockGuitarName));

    expect(store.getActions()).toEqual([setFoundGuitars(mockFoundGuitars)]);
  });

  it('should handle failed get found guitars request', async () => {
    const store = createMockStore();
    mockAPI.onGet(APIRoute.CatalogGuitars()).reply(400);

    await store.dispatch(getGuitarsSimilarToName(mockGuitarName));

    expect(store.getActions()).toEqual([setFoundGuitars(null)]);
  });

  it('should handle succeed get all guitars request', async () => {
    const store = createMockStore();
    mockAPI.onGet(APIRoute.CatalogGuitars()).reply(200, mockFoundGuitars);

    await store.dispatch(getAllGuitars());

    expect(store.getActions()).toEqual([setAllGuitars(mockFoundGuitars)]);
  });

  it('should handle failed get all guitars request', async () => {
    const store = createMockStore();
    mockAPI.onGet(APIRoute.CatalogGuitars()).reply(400);

    await store.dispatch(getAllGuitars());

    expect(store.getActions()).toEqual([setAllGuitars(null)]);
  });
});
