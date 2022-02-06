import { HumanizedGuitar } from '../../constants/guitar';
import { CartItem } from '../../types/cart';
import { formatPrice } from '../../utils/guitar';

type CartItemProps = {
  item: CartItem;
  onDelete: () => void;
};

function CartItemCard({
  item: { product, quantity }, onDelete,
}: CartItemProps): JSX.Element {

  const totalPrice = product.price * quantity;

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
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder="1"
          value={quantity}
          id="2-count"
          name="2-count"
          max="99"
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
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
