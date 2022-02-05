import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getTotalPrice } from '../../store/cart/cart-selectors';
import { formatPrice } from '../../utils/guitar';

function CartTotalInfo(): JSX.Element {
  const totalPrice = useSelector(getTotalPrice);
  const discount = 0;
  const totalPriceWithDiscount = totalPrice - discount;

  const withDiscount = discount > 0;

  return (
    <div className="cart__total-info" data-testid="cart-total-info">
      <p className="cart__total-item">
        <span className="cart__total-value-name">Всего:</span>
        <span className="cart__total-value">{formatPrice(totalPrice)}</span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">Скидка:</span>
        <span className={classNames('cart__total-value', {
          'cart__total-value--bonus': withDiscount,
        })}
        >
          {withDiscount && '- '}{formatPrice(discount)}
        </span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">К оплате:</span>
        <span className="cart__total-value cart__total-value--payment">
          {formatPrice(totalPriceWithDiscount)}
        </span>
      </p>
      <button className="button button--red button--big cart__order-button">
        Оформить заказ
      </button>
    </div>
  );
}

export default CartTotalInfo;
