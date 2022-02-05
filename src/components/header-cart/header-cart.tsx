import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { getTotalQuantity } from '../../store/cart/cart-selectors';
import { PropsWithClassName } from '../../types/props';

function HeaderCart({ className }: PropsWithClassName) {
  const totalQuantity = useSelector(getTotalQuantity);
  const isCartCountShown = totalQuantity > 0;

  return (
    <NavLink
      to={AppRoute.Cart()}
      className={classNames(className)}
      aria-label="Корзина"
    >
      <svg
        className="header__cart-icon"
        width="14"
        height="14"
        aria-hidden="true"
      >
        <use xlinkHref="#icon-basket"></use>
      </svg>
      <span className="visually-hidden">Перейти в корзину</span>
      {isCartCountShown && (
        <span className="header__cart-count">{totalQuantity}</span>
      )}
    </NavLink>
  );
}

export default HeaderCart;
