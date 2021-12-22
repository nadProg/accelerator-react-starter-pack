import { Guitar } from '../../types/types';
import Rating from '../rating/rating';

type ProductCardProps = {
  product: Guitar;
}

function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <div className="product-card">
      <img
        src={`/${product.previewImg}`}
        width="75"
        height="190"
        alt={product.name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <Rating value={product.rating} />
          <span className="rate__count">{product.comments?.length || 0}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{product.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#">
          Подробнее
        </a>
        <a
          className="button button--red button--mini button--add-to-cart"
          href="#"
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
