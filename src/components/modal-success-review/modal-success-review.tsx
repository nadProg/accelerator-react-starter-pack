import { useRef } from 'react';
import { useModal } from '../../hooks/use-modal';
import { ModalProps } from '../../types/props';

function ModalSuccessReview({ onClose }: ModalProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  useModal(rootRef, onClose);

  return (
    <div
      ref={rootRef}
      className="modal is-active modal--success"
      data-testid="modal-success-review"
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          data-testid="modal-overlay"
          onClick={onClose}
        />
        <div className="modal__content">
          <svg
            className="modal__icon"
            width="26"
            height="20"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button
              className="button button--small modal__button modal__button--review"
              data-testid="success-button-confirm"
              onClick={onClose}
            >
              К покупкам!
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            data-testid="modal-button-close"
            onClick={onClose}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessReview;