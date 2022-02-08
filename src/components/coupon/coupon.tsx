import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState
} from 'react';
import classNames from 'classnames';
import { PropsWithClassName } from '../../types/props';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCoupon,
  getDiscountStatus
} from '../../store/coupon/coupon-selectors';
import {
  isFetchError,
  isFetchLoading,
  isFetchSuccess
} from '../../utils/fetched-data';
import { setCoupon, setDiscountStatus } from '../../store/coupon/coupon-actions';
import { FetchStatus } from '../../constants/common';
import { CouponPost } from '../../types/coupon';
import { postCoupon } from '../../store/coupon/coupon-api-actions';
import { sanitizeTextInput } from '../../utils/coupon';

function Coupon({ className }: PropsWithClassName) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    const postCouponData: CouponPost = {
      coupon: currentCoupon,
    };

    dispatch(setCoupon(currentCoupon));
    dispatch(postCoupon(postCouponData));
  };

  const couponInitialValue =  useSelector(getCoupon);

  const [currentCoupon, setCurrentCoupon] =
    useState<CouponPost['coupon']>(couponInitialValue);

  const dispatch = useDispatch();

  const couponStatus = useSelector(getDiscountStatus);

  useEffect(
    () => () => {
      dispatch(setDiscountStatus(FetchStatus.Idle));
    },
    [],
  );

  const handleCouponChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setCurrentCoupon(sanitizeTextInput(evt.target.value));
  };

  const isSendingRequest = isFetchLoading(couponStatus);
  const isCouponSuccess = isFetchSuccess(couponStatus);
  const isCouponError = isFetchError(couponStatus);

  return (
    <div className={classNames(className, 'coupon')} data-testid="coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" onSubmit={handleSubmit}>
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            value={currentCoupon}
            onChange={handleCouponChange}
            data-testid="coupon-input"
          />
          {isCouponSuccess && (
            <p className="form-input__message form-input__message--success">
              Промокод принят
            </p>
          )}

          {isCouponError && (
            <p className="form-input__message form-input__message--error">
              Неверный промокод
            </p>
          )}
        </div>
        <button
          className="button button--big coupon__button"
          disabled={isSendingRequest}
          data-testid="coupon-submit"
        >
          Применить
        </button>
      </form>
    </div>
  );
}

export default Coupon;
