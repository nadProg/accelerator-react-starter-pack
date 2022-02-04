import { HumanizedGuitar } from '../../constants/guitar';
import { GuitarWithReviews } from '../../types/guitar';
import { ModalProps } from '../../types/props';

type ModalCartAddProps = ModalProps & {
  guitar: GuitarWithReviews;
};

function ModalCartAdd({ guitar, onClose }: ModalCartAddProps): JSX.Element {
  return (
    <>
      <div
        className="modal__overlay"
        data-close-modal
        data-testid="modal-overlay"
        onClick={onClose}
      >
      </div>
      <div className="modal__content">
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
    </>
  );
}

export default ModalCartAdd;
