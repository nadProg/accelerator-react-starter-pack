import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';
import { FetchStatusType } from '../../types/common';
import { CouponGet, CouponPost } from '../../types/coupon';

export const setDiscountStatus = createAction(Action.SetDiscountStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setDiscount = createAction(Action.SetDiscount, (discount: CouponGet | null) => ({
  payload: {
    discount,
  },
}));

export const setCoupon = createAction(Action.SetCoupon, (coupon: CouponPost['coupon']) => ({
  payload: {
    coupon,
  },
}));
