import { HumanizedGuitar } from '../../constants/guitar';
import { GuitarWithComments } from '../../types/guitar';
import { ModalProps } from '../../types/props';

type ModalCartAddProps = ModalProps & {
  product: GuitarWithComments;
};

function ModalCartAdd({ product, onClose }: ModalCartAddProps): JSX.Element {
  return (
    <div className="modal is-active modal-for-ui-kit" data-testid="modal">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={onClose}
          data-testid="modal-overlay"
        >
        </div>
        <div className="modal__content">
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
              <p className="modal__product-params">{HumanizedGuitar[product.type]}, {product.stringCount} струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{product.price} ₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--red button--big modal__button modal__button--add"
              onClick={onClose}
            >
              Добавить в корзину
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            data-testid="modal-button-close"
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCartAdd;
