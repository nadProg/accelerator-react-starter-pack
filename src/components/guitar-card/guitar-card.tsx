import { MouseEventHandler, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { GuitarWithReviews } from '../../types/guitar';
import { formatPrice } from '../../utils/guitar';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';
import ModalContainer from '../modal-container/modal-container';
import Rating from '../rating/rating';

type GuitarCardProps = {
  guitar: GuitarWithReviews;
};

function GuitarCard({ guitar }: GuitarCardProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBasketLinkClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalContainer
        isActive={isModalOpen}
        onClose={handleModalClose}
        testId="modal-cart-add"
      >
        <ModalCartAdd
          guitar={guitar}
          onClose={handleModalClose}
        />
      </ModalContainer>

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
            {formatPrice(guitar.price)} ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <NavLink className="button button--mini" to={AppRoute.Card(guitar.id)}>
          Подробнее
          </NavLink>
          <a
            className="button button--red button--mini button--add-to-cart"
            href={AppRoute.Basket()}
            onClick={handleBasketLinkClick}
            data-testid="button-add-to-cart"
          >
          Купить
          </a>
        </div>
      </div>
    </>

  );
}

export default GuitarCard;
