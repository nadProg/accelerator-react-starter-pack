import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { HumanizedGuitar } from '../../constants/guitar';
import { useInCart } from '../../hooks/use-in-cart';
import { useScrollBlock } from '../../hooks/use-scroll-block';
import {
  addItemToCart,
  increaseItemInCart
} from '../../store/cart/cart-actions';
import { Product } from '../../types/cart';
import { ModalProps } from '../../types/props';
import ModalContainer from '../modal-container/modal-container';

type ModalAddCartProps = ModalProps & {
  product: Product | null;
};

function ModalAddCartItem({
  product,
  isActive,
  onClose,
}: ModalAddCartProps): JSX.Element {
  const [isAddCartOpen, setIsAddCartOpen] = useState(true);
  const [isAddCartSuccessOpen, setIsAddCartSuccessOpen] = useState(false);

  const inCart = useInCart(product?.id);

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
      if (inCart) {
        dispatch(increaseItemInCart((product as Product).id));
      } else {
        dispatch(addItemToCart(product as Product));
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
        testId="modal-add-cart-item"
      >
        {product && (
          <>
            <h2 className="modal__header title title--medium">
              Добавить товар в корзину
            </h2>
            <div className="modal__info">
              <img
                className="modal__img"
                src={`/${product.previewImg}`}
                width="67"
                height="137"
                alt={product.name}
              />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">
                  {product.name}
                </h3>
                <p className="modal__product-params modal__product-params--margin-11">
                  Артикул: {product.vendorCode}
                </p>
                <p className="modal__product-params">
                  {HumanizedGuitar[product.type]}, {product.stringCount}{' '}
                  струнная
                </p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{product.price} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                className="button button--red button--big modal__button modal__button--add"
                data-testid="modal-add-cart-item-submit"
                onClick={handleAddCartSubmit}
              >
                Добавить в корзину
              </button>
            </div>
          </>
        )}
      </ModalContainer>

      <ModalContainer
        isActive={isActive && isAddCartSuccessOpen}
        onClose={handleAddCartSuccessClose}
        testId="modal-add-cart-item-success"
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
            data-testid="modal-add-cart-item-success-submit"
            onClick={handleAddCartSuccessClose}
          >
            Продолжить покупки
          </button>
        </div>
      </ModalContainer>
    </>
  );
}

export default ModalAddCartItem;
