import { FetchStatusType } from '../../types/common';
import { Discount, Coupon } from '../../types/coupon';
import { State } from '../../types/store';

export const getDiscountData = ({ coupon }: State): Discount | null => coupon.discount.data;

export const getDiscountStatus = ({ coupon }: State): FetchStatusType => coupon.discount.status;

export const getCoupon = ({ coupon }: State): Coupon => coupon.coupon;
