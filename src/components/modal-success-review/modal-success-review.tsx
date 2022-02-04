import { ModalProps } from '../../types/props';

function ModalSuccessReview({ onClose }: ModalProps): JSX.Element {
  return (
    <>
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
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
    </>
  );
}

export default ModalSuccessReview;
