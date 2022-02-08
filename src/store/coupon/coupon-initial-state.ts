import { FetchStatus } from '../../constants/common';
import { FetchedData } from '../../types/common';
import { Discount, Coupon } from '../../types/coupon';

type CouponState = {
  coupon: Coupon,
  discount: FetchedData<Discount>
}

export const couponInitialState: CouponState = {
  coupon: '',
  discount: {
    status: FetchStatus.Idle,
    data: null,
  },
};
