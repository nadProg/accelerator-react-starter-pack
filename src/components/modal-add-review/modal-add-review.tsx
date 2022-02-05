import { useState } from 'react';
import { useScrollBlock } from '../../hooks/use-scroll-block';
import { Guitar } from '../../types/guitar';
import { ModalProps } from '../../types/props';
import AddReviewForm from '../add-review-form/add-review-form';
import ModalContainer from '../modal-container/modal-container';

type ModalAddReviewProps<T extends Guitar = Guitar> = ModalProps & {
  guitar: T;
};

function ModalAddReview({ isActive, onClose, guitar }: ModalAddReviewProps) {
  const [isMainModalOpen, setIsMainModalOpen] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useScrollBlock(isActive);

  const handleSuccessModalClose = () => {
    setIsMainModalOpen(true);
    setIsSuccessModalOpen(false);
    onClose();
  };

  const handleAddReviewFormSuccessSubmitting = () => {
    setIsMainModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <ModalContainer
        isActive={isActive && isMainModalOpen}
        onClose={onClose}
        testId="modal-review-form"
      >
        <h2 className="modal__header modal__header--review title title--medium">
          Оставить отзыв
        </h2>
        <h3 className="modal__product-name title title--medium-20 title--uppercase">
          {guitar.name}
        </h3>
        <AddReviewForm
          guitarId={guitar.id}
          onSuccessSubmitting={handleAddReviewFormSuccessSubmitting}
        />
      </ModalContainer>

      <ModalContainer
        isActive={isActive && isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        testId="modal-success-review"
        success
      >
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Спасибо за ваш отзыв!</p>
        <div className="modal__button-container modal__button-container--review">
          <button
            className="button button--small modal__button modal__button--review"
            data-testid="success-button-confirm"
            onClick={handleSuccessModalClose}
          >
            К покупкам!
          </button>
        </div>
      </ModalContainer>
    </>
  );
}

export default ModalAddReview;
