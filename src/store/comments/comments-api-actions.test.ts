
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../../services/api';
import { ActionType, State } from '../../types/store';
import MockAdapter from 'axios-mock-adapter';
import { APIRoute } from '../../constants/endpoints';
import { FetchStatus } from '../../constants/common';
import thunk from 'redux-thunk';
import { createMockState } from '../../mock/state';
import { createMockComment } from '../../mock/comment';
import { postComment } from './comments-api-actions';
import { addCommentToCurrentGuitar } from '../guitars/guitars-actions';
import { setNewCommentStatus } from './comments-actions';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const createMockStore = configureMockStore<
  State,
  ActionType,
  ThunkDispatch<State, typeof api, ActionType>
>(middlewares);

const mockComment = createMockComment();

describe('Api-actions: Comments', () => {
  it('should handle succeed post comment', async () => {
    const mockState = createMockState();
    const store = createMockStore(mockState);

    mockAPI.onPost(APIRoute.Comment()).reply(200, mockComment);

    await store.dispatch(postComment(mockComment));

    expect(store.getActions()).toEqual([
      setNewCommentStatus(FetchStatus.Loading),
      addCommentToCurrentGuitar(mockComment),
      setNewCommentStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed post comment', async () => {
    const mockState = createMockState();
    const store = createMockStore(mockState);

    mockAPI.onPost(APIRoute.Comment()).reply(400);

    await store.dispatch(postComment(mockComment));

    expect(store.getActions()).toEqual([
      setNewCommentStatus(FetchStatus.Loading),
      setNewCommentStatus(FetchStatus.Failed),
    ]);
  });
});

export {};
