
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../../services/api';
import { ActionType, State } from '../../types/store';
import MockAdapter from 'axios-mock-adapter';
import { APIRoute } from '../../constants/endpoints';
import { FetchStatus } from '../../constants/common';
import thunk from 'redux-thunk';
import { createMockState } from '../../mock/state';
import { createMockReview } from '../../mock/review';
import { postReview } from './reviews-api-actions';
import { addReviewToCurrentGuitar } from '../guitars/guitars-actions';
import { setNewReviewStatus } from './reviews-actions';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const createMockStore = configureMockStore<
  State,
  ActionType,
  ThunkDispatch<State, typeof api, ActionType>
>(middlewares);

const mockReview = createMockReview();

describe('Api-actions: Reviews', () => {
  it('should handle succeed post review', async () => {
    const mockState = createMockState();
    const store = createMockStore(mockState);

    mockAPI.onPost(APIRoute.Reviews()).reply(200, mockReview);

    await store.dispatch(postReview(mockReview));

    expect(store.getActions()).toEqual([
      setNewReviewStatus(FetchStatus.Loading),
      addReviewToCurrentGuitar(mockReview),
      setNewReviewStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed post review', async () => {
    const mockState = createMockState();
    const store = createMockStore(mockState);

    mockAPI.onPost(APIRoute.Reviews()).reply(400);

    await store.dispatch(postReview(mockReview));

    expect(store.getActions()).toEqual([
      setNewReviewStatus(FetchStatus.Loading),
      setNewReviewStatus(FetchStatus.Failed),
    ]);
  });
});

export {};
