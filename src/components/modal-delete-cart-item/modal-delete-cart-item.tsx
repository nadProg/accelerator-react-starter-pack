import { useDispatch } from 'react-redux';
import { HumanizedGuitar } from '../../constants/guitar';
import { deleteItemFromCart } from '../../store/cart/cart-actions';
import { Guitar } from '../../types/guitar';
import { ModalProps } from '../../types/props';
import { formatPrice } from '../../utils/guitar';
import ModalContainer from '../modal-container/modal-container';

type ModalDeleteCartItemProps = ModalProps & {
  product: Guitar | null;
};

function ModalDeleteCartItem({
  isActive,
  onClose,
  product,
}: ModalDeleteCartItemProps): JSX.Element {
  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => {
    if (!product) {
      return;
    }

    dispatch(deleteItemFromCart(product.id));
    onClose();
  };

  return (
    <ModalContainer
      isActive={isActive}
      onClose={onClose}
      scrollBlock
      testId="modal-delete-cart-item"
    >
      {product && (
        <>
          <h2 className="modal__header title title--medium title--red">
            Удалить этот товар?
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
                {HumanizedGuitar[product.type]}, {product.stringCount} струнная
              </p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">
                  {formatPrice(product.price)}
                </span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--small modal__button"
              onClick={handleDeleteButtonClick}
            >
              Удалить товар
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={onClose}
            >
              Продолжить покупки
            </button>
          </div>
        </>
      )}
    </ModalContainer>
  );
}

export default ModalDeleteCartItem;
