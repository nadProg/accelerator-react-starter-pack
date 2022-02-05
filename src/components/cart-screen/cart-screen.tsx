import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { getCartItems } from '../../store/cart/cart-selectors';
import CartItemCard from '../cart-item-card/cart-item-card';
import CartTotalInfo from '../cart-total-info/cart-total-info';
import Coupon from '../coupon/coupon';

function CartScreen(): JSX.Element {
  const cartItems = useSelector(getCartItems);

  return (
    <>
      <h1 className="title title--bigger page-content__title">Корзина</h1>
      <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
        <li className="breadcrumbs__item">
          <NavLink className="link" to={AppRoute.Root()}>
            Главная
          </NavLink>
        </li>
        <li className="breadcrumbs__item">
          <NavLink className="link" to={AppRoute.Catalog()}>Каталог</NavLink>
        </li>
        <li className="breadcrumbs__item">
          <a className="link">Корзина</a>
        </li>
      </ul>
      <div className="cart">
        {cartItems.map((cartItem) => <CartItemCard key={cartItem.product.id} item={cartItem} />)}
        <div className="cart__footer">
          <Coupon className="cart__coupon" />
          <CartTotalInfo />
        </div>
      </div>
    </>);
}

export default CartScreen;
