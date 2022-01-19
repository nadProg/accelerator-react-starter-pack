import { ModalProps, PropsWithChildren } from '../../types/props';

type ModalReviewFormProps = ModalProps & PropsWithChildren & {
  title: string;
};

function ModalReviewForm({
  onClose, children, title,
}: ModalReviewFormProps): JSX.Element {
  return (
    <>
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
          {title}
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
    </>
  );
}

export default ModalReviewForm;
