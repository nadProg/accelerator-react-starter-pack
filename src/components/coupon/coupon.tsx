import { FormEventHandler } from 'react';
import classNames from 'classnames';
import { PropsWithClassName } from '../../types/props';

function Coupon({ className }: PropsWithClassName) {
  const isSuccess = false;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className={classNames(className, 'coupon')}>
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
          />
          {isSuccess && (
            <p className="form-input__message form-input__message--success">
              Промокод принят
            </p>
          )}
        </div>
        <button className="button button--big coupon__button">Применить</button>
      </form>
    </div>
  );
}

export default Coupon;
