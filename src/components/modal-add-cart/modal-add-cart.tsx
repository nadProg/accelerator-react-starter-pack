import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { HumanizedGuitar } from '../../constants/guitar';
import { useInCart } from '../../hooks/use-in-cart';
import { useScrollBlock } from '../../hooks/use-scroll-block';
import { addItemToCart } from '../../store/cart/cart-actions';
import { GuitarWithReviews } from '../../types/guitar';
import { ModalProps } from '../../types/props';
import ModalContainer from '../modal-container/modal-container';

type ModalAddCartProps = ModalProps & {
  guitar: GuitarWithReviews;
};

function ModalAddCart({
  guitar,
  isActive,
  onClose,
}: ModalAddCartProps): JSX.Element {
  const [isAddCartOpen, setIsAddCartOpen] = useState(true);
  const [isAddCartSuccessOpen, setIsAddCartSuccessOpen] = useState(false);

  const inCart = useInCart(guitar.id);

  const dispatch = useDispatch();

  useScrollBlock(isActive);

  const handleAddCartClose = () => {
    setIsAddCartOpen(false);
  };

  const handleAddCartSuccessClose = () => {
    setIsAddCartSuccessOpen(false);
    setIsAddCartOpen(true);
    onClose();
  };

  const handleAddCartSubmit = () => {

    try {
      // throw new Error();
      if (inCart) {
        console.log('Should increase quantity');
      } else {
        dispatch(addItemToCart(guitar));
      }
      handleAddCartClose();
    } catch (error) {
      toast.error('Не удалось добавить товар в корзину');
      return;
    }

    setIsAddCartSuccessOpen(true);
  };

  return (
    <>
      <ModalContainer
        isActive={isActive && isAddCartOpen}
        onClose={onClose}
        testId="modal-add-cart"
      >
        <h2 className="modal__header title title--medium">
          Добавить товар в корзину
        </h2>
        <div className="modal__info">
          <img
            className="modal__img"
            src={`/${guitar.previewImg}`}
            width="67"
            height="137"
            alt={guitar.name}
          />
          <div className="modal__info-wrapper">
            <h3 className="modal__product-name title title--little title--uppercase">
              {guitar.name}
            </h3>
            <p className="modal__product-params modal__product-params--margin-11">
              Артикул: {guitar.vendorCode}
            </p>
            <p className="modal__product-params">
              {HumanizedGuitar[guitar.type]}, {guitar.stringCount} струнная
            </p>
            <p className="modal__price-wrapper">
              <span className="modal__price">Цена:</span>
              <span className="modal__price">{guitar.price} ₽</span>
            </p>
          </div>
        </div>
        <div className="modal__button-container">
          <button
            className="button button--red button--big modal__button modal__button--add"
            onClick={handleAddCartSubmit}
          >
            Добавить в корзину
          </button>
        </div>
      </ModalContainer>

      <ModalContainer
        isActive={isActive && isAddCartSuccessOpen}
        onClose={handleAddCartSuccessClose}
        testId="modal-add-cart-success"
        success
      >
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Товар успешно добавлен в корзину</p>
        <div className="modal__button-container modal__button-container--add">
          <NavLink
            className="button button--small modal__button"
            to={AppRoute.Cart()}
          >
            Перейти в корзину
          </NavLink>
          <button
            className="button button--black-border button--small modal__button modal__button--right"
            onClick={handleAddCartSuccessClose}
          >
            Продолжить покупки
          </button>
        </div>
      </ModalContainer>
    </>
  );
}

export default ModalAddCart;
