import { useRef } from 'react';
import { useModal } from '../../hooks/use-modal';
import { ModalProps, PropsWithChildren } from '../../types/props';

type ModalReviewFormProps = ModalProps & PropsWithChildren;

function ModalReviewForm({
  onClose, children,
}: ModalReviewFormProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  useModal(rootRef, onClose);


  return (
    <div
      ref={rootRef}
      className="modal is-active modal--review"
      data-testid="modal-review-form"
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          data-testid="modal-overlay"
          onClick={onClose}
        />
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">
            Оставить отзыв
          </h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">
            СURT Z30 Plus
          </h3>

          {children}

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

export default ModalReviewForm;
