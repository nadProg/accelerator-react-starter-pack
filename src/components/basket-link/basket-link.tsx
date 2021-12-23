import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { PropsWithClassName } from '../../types/props';

function BasketLink({ className }: PropsWithClassName) {
  return (
    <NavLink
      to={AppRoute.Basket()}
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
      <span className="header__cart-count">2</span>
    </NavLink>
  );
}

export default BasketLink;
