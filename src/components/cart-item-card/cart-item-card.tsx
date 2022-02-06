import {
  FocusEventHandler,
  KeyboardEvent,
  FocusEvent,
  useEffect,
  useRef,
  KeyboardEventHandler
} from 'react';
import { useDispatch } from 'react-redux';
import { QuantityRestriction } from '../../constants/cart';
import { KeyCode } from '../../constants/common';
import { HumanizedGuitar } from '../../constants/guitar';
import {
  decreaseItemInCart,
  increaseItemInCart,
  setCartItemQuantity
} from '../../store/cart/cart-actions';
import { CartItem } from '../../types/cart';
import { formatPrice } from '../../utils/guitar';

type CartItemProps = {
  item: CartItem;
  onDelete: () => void;
};

function CartItemCard({
  item: { product, quantity },
  onDelete,
}: CartItemProps): JSX.Element {
  const inputQuantityRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const totalPrice = product.price * quantity;

  useEffect(() => {
    if (inputQuantityRef.current) {
      inputQuantityRef.current.value = String(quantity);
    }
  }, [quantity]);

  const handleIncreaseButtonClick = () => {
    if (quantity >= QuantityRestriction.Max) {
      dispatch(setCartItemQuantity(product.id, QuantityRestriction.Max));
      return;
    }

    dispatch(increaseItemInCart(product.id));
  };

  const handleDecreaseButtonClick = () => {
    if (quantity <= QuantityRestriction.Min) {
      dispatch(setCartItemQuantity(product.id, QuantityRestriction.Min));
      onDelete();
      return;
    }

    dispatch(decreaseItemInCart(product.id));
  };

  const handleQuantityInputChange = (
    evt: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    const newQuantity = Number((evt.target as HTMLInputElement).value);

    if (newQuantity > QuantityRestriction.Max) {
      dispatch(setCartItemQuantity(product.id, QuantityRestriction.Max));
      return;
    }

    if (newQuantity < QuantityRestriction.Min) {
      dispatch(setCartItemQuantity(product.id, QuantityRestriction.Min));
      onDelete();
      return;
    }

    dispatch(setCartItemQuantity(product.id, newQuantity));
  };

  const handleQuantityInputKeydown: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    if (evt.code === KeyCode.Enter || evt.code === KeyCode.NumpadEnter) {
      handleQuantityInputChange(evt);
      (evt.target as HTMLInputElement).blur();
    }
  };

  const handleQuantityInputBlur: FocusEventHandler<HTMLInputElement> = (
    evt,
  ) => {
    handleQuantityInputChange(evt);
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
          data-testid="cart-item-decrease-btn"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          ref={inputQuantityRef}
          className="quantity__input"
          type="number"
          defaultValue={quantity}
          id={`${product.id}-count`}
          name={`${product.id}-count`}
          min="0"
          max="99"
          onBlur={handleQuantityInputBlur}
          onKeyDown={handleQuantityInputKeydown}
          data-testid="cart-item-quantity-input"
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={handleIncreaseButtonClick}
          data-testid="cart-item-increase-btn"
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
