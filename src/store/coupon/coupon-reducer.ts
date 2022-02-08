import { createReducer } from '@reduxjs/toolkit';
import { setCoupon, setDiscount, setDiscountStatus } from './coupon-actions';
import { couponInitialState } from './coupon-initial-state';

export const couponReducer = createReducer(couponInitialState, (builder) => {
  builder
    .addCase(setCoupon, (state, action) => {
      state.coupon = action.payload.coupon;
    })
    .addCase(setDiscount, (state, action) => {
      state.discount.data = action.payload.discount;
    })
    .addCase(setDiscountStatus, (state, action) => {
      state.discount.status = action.payload.status;
    });
});
