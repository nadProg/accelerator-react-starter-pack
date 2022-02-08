import { FetchStatusType } from '../../types/common';
import { CouponGet, CouponPost } from '../../types/coupon';
import { State } from '../../types/store';

export const getDiscountData = ({ coupon }: State): CouponGet | null => coupon.discount.data;

export const getDiscountStatus = ({ coupon }: State): FetchStatusType => coupon.discount.status;

export const getCoupon = ({ coupon }: State): CouponPost['coupon'] => coupon.coupon;
