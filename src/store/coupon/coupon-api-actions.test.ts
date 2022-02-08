
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../../services/api';
import { ActionType, State } from '../../types/store';
import MockAdapter from 'axios-mock-adapter';
import { APIRoute } from '../../constants/endpoints';
import { FetchStatus } from '../../constants/common';
import thunk from 'redux-thunk';
import { createMockState } from '../../mock/state';
import { CouponGet, CouponPost } from '../../types/coupon';
import { datatype, lorem } from 'faker';
import { postCoupon } from './coupon-api-actions';
import { setDiscount, setDiscountStatus } from './coupon-actions';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const createMockStore = configureMockStore<
  State,
  ActionType,
  ThunkDispatch<State, typeof api, ActionType>
>(middlewares);

const mockCouponPost: CouponPost = {
  coupon: lorem.word(),
};

const mockCouponGet: CouponGet = datatype.number();

describe('Api-actions: Coupon', () => {
  it('should handle succeed post coupon', async () => {
    const mockState = createMockState();
    const store = createMockStore(mockState);

    mockAPI.onPost(APIRoute.Coupons()).reply(201, mockCouponGet);

    await store.dispatch(postCoupon(mockCouponPost));

    expect(store.getActions()).toEqual([
      setDiscountStatus(FetchStatus.Loading),
      setDiscount(mockCouponGet),
      setDiscountStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed post coupon', async () => {
    const mockState = createMockState();
    const store = createMockStore(mockState);

    mockAPI.onPost(APIRoute.Coupons()).reply(400);

    await store.dispatch(postCoupon(mockCouponPost));

    expect(store.getActions()).toEqual([
      setDiscountStatus(FetchStatus.Loading),
      setDiscount(null),
      setDiscountStatus(FetchStatus.Failed),
    ]);
  });
});
