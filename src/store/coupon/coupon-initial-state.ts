import { FetchStatus } from '../../constants/common';
import { FetchedData } from '../../types/common';
import { CouponGet, CouponPost } from '../../types/coupon';

type CouponState = {
  coupon: CouponPost['coupon'],
  discount: FetchedData<CouponGet>
}

export const couponInitialState: CouponState = {
  coupon: '',
  discount: {
    status: FetchStatus.Idle,
    data: null,
  },
};
