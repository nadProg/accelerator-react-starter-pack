import { ChangeEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { HumanizedGuitar } from '../../constants/guitar';
import { decreaseItemInCart, increaseItemInCart } from '../../store/cart/cart-actions';
import { CartItem } from '../../types/cart';
import { formatPrice } from '../../utils/guitar';

type CartItemProps = {
  item: CartItem;
  onDelete: () => void;
};

const QuantityRestriction = {
  Min: 1,
  Max: 99,
};

function CartItemCard({
  item: { product, quantity }, onDelete,
}: CartItemProps): JSX.Element {
  const dispatch = useDispatch();

  const totalPrice = product.price * quantity;

  const handleIncreaseButtonClick = () => {
    if (quantity >= QuantityRestriction.Max) {
      console.log('Set max value');
      return;
    }

    dispatch(increaseItemInCart(product.id));
  };

  const handleDecreaseButtonClick = () => {
    if (quantity <= QuantityRestriction.Min) {

      console.log('Set min value');
      onDelete();
      return;
    }

    dispatch(decreaseItemInCart(product.id));
  };

  const handleQuantityInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const newQuantity = Number(evt.target.value);
    if (Number.isNaN(newQuantity) || newQuantity > QuantityRestriction.Max) {
      return;
    }

    if (newQuantity < QuantityRestriction.Min) {
      onDelete();
      return;
    }

    console.log('Set new value');
  };

  return (
    <div className="cart-item" data-testid="cart-item-card">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        data-testid="cart-item-delete-btn"
        onClick={onDelete}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={`/${product.previewImg}`}
          width="55"
          height="130"
          alt={product.name}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{product.name}</p>
        <p className="product-info__info">Артикул: {product.vendorCode}</p>
        <p className="product-info__info">
          {HumanizedGuitar[product.type]}, {product.stringCount} струнная
        </p>
      </div>
      <div className="cart-item__price">{formatPrice(product.price)}</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={handleDecreaseButtonClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          value={quantity}
          id={`${product.id}-count`}
          name={`${product.id}-count`}
          min="0"
          max="99"
          onChange={handleQuantityInputChange}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={handleIncreaseButtonClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{formatPrice(totalPrice)}</div>
    </div>
  );
}

export default CartItemCard;
