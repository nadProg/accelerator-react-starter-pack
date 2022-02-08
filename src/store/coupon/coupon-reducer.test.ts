import { datatype, lorem } from 'faker';
import { UNKNOWN_ACTION } from '../../constants/action';
import { FetchStatus } from '../../constants/common';
import { setCoupon, setDiscount, setDiscountStatus } from './coupon-actions';
import { couponInitialState } from './coupon-initial-state';
import { couponReducer } from './coupon-reducer';


describe('Reducer: Coupon', () => {
  it('without additional parameters should return initial state', () => {
    expect(couponReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(couponInitialState);
  });

  it('should set discount', () => {
    const mockDiscount = datatype.number();

    expect(couponReducer(couponInitialState, setDiscount(mockDiscount)))
      .toEqual({
        ...couponInitialState,
        discount: {
          ...couponInitialState.discount,
          data: mockDiscount,
        },
      });
  });

  it('should set discount status', () => {
    const mockStatus = FetchStatus.Succeeded;

    expect(couponReducer(couponInitialState, setDiscountStatus(mockStatus)))
      .toEqual({
        ...couponInitialState,
        discount: {
          ...couponInitialState.discount,
          status: mockStatus,
        },
      });
  });

  it('should set coupon', () => {
    const mockCoupon = lorem.word();

    expect(couponReducer(couponInitialState, setCoupon(mockCoupon)))
      .toEqual({
        ...couponInitialState,
        coupon: mockCoupon,
      });
  });
});
