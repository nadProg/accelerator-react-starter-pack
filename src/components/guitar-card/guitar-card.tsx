import classNames from 'classnames';
import { MouseEventHandler, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { useInCart } from '../../hooks/use-in-cart';
import { GuitarWithReviews } from '../../types/guitar';
import { formatPrice } from '../../utils/guitar';
import ModalAddCart from '../modal-add-cart/modal-add-cart';
import Rating from '../rating/rating';

type GuitarCardProps = {
  guitar: GuitarWithReviews;
};

function GuitarCard({ guitar }: GuitarCardProps): JSX.Element {
  const [isModalAddCartOpen, setIsModalAddCartOpen] = useState(false);

  const inCart = useInCart(guitar.id);

  const handleBasketLinkClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    if (!inCart) {
      evt.preventDefault();
      setIsModalAddCartOpen(true);
    }
  };

  return (
    <>
      <ModalAddCart
        isActive={isModalAddCartOpen}
        onClose={() => setIsModalAddCartOpen(false)}
        guitar={guitar}
      />

      <div className="product-card">
        <img
          src={`/${guitar.previewImg}`}
          width="75"
          height="190"
          alt={guitar.name}
        />
        <div className="product-card__info">
          <div className="rate product-card__rate" aria-hidden="true">
            <span className="visually-hidden">Рейтинг:</span>
            <Rating value={guitar.rating} />
            <span className="rate__count">{guitar.comments.length}</span>
            <span className="rate__message"></span>
          </div>
          <p className="product-card__title">{guitar.name}</p>
          <p className="product-card__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(guitar.price)}
          </p>
        </div>
        <div className="product-card__buttons">
          <NavLink
            className="button button--mini"
            to={AppRoute.Card(guitar.id)}
          >
            Подробнее
          </NavLink>
          <NavLink
            className={classNames(
              'button',
              'button--mini',
              inCart
                ? 'button--red-border button--in-cart'
                : 'button--red button--add-to-cart',
            )}
            to={AppRoute.Cart()}
            onClick={handleBasketLinkClick}
            data-testid="button-add-to-cart"
          >
            {inCart ? 'В Корзине' : 'Купить'}
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default GuitarCard;
