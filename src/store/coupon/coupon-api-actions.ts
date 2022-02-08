import { FetchStatus } from '../../constants/common';
import { APIRoute } from '../../constants/endpoints';
import { Discount, CouponPost } from '../../types/coupon';
import { ThunkActionResult } from '../../types/store';
import { setDiscount, setDiscountStatus } from './coupon-actions';

export const postCoupon =
  (postData: CouponPost): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(setDiscountStatus(FetchStatus.Loading));

      try {
        const { data: discount } = await api.post<Discount>(APIRoute.Coupons(), postData);

        dispatch(setDiscount(discount));
        dispatch(setDiscountStatus(FetchStatus.Succeeded));
      } catch (error) {
        dispatch(setDiscount(null));
        dispatch(setDiscountStatus(FetchStatus.Failed));
      }
    };
