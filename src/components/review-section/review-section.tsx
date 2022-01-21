import classNames from 'classnames';
import { MouseEventHandler, useMemo, useRef, useState } from 'react';
import { REVIEWS_PAGE_SIZE } from '../../constants/review';
import { useIntersection } from '../../hooks/use-intersection';
import { useShowMore } from '../../hooks/use-show-more';
import { GuitarWithReviews } from '../../types/guitar';
import { sortByDate } from '../../utils/review';
import AddReviewForm from '../add-review-form/add-review-form';
import ModalContainer from '../modal-container/modal-container';
import ModalReviewForm from '../modal-review-form/modal-review-form';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import Review from '../review/review';
import styles from './review-section.module.css';

type ReviewSectionProps = {
  guitar: GuitarWithReviews;
};

function ReviewSection({ guitar }: ReviewSectionProps): JSX.Element {
  const [isReviewFormModalOpen, setIsReviewFormModalOpen] = useState(false);
  const [isSuccessReviewModalOpen, setIsSuccessReviewModalOpen] =
    useState(false);

  const sortedReviews = useMemo(
    () => sortByDate(guitar.comments),
    [guitar.comments],
  );

  const {
    shownItems: shownReviews,
    isMore: isMoreReviews,
    showMore: showMoreReviews,
  } = useShowMore({
    items: sortedReviews,
    size: REVIEWS_PAGE_SIZE,
  });

  const handleAddReviewLink: MouseEventHandler = (evt) => {
    evt.preventDefault();
    setIsReviewFormModalOpen(true);
  };

  const handleReviewFormClose = () => {
    setIsReviewFormModalOpen(false);
  };

  const handleSuccessReviewClose = () => {
    setIsSuccessReviewModalOpen(false);
  };

  const withReviews = Boolean(guitar.comments.length);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useIntersection(buttonRef, showMoreReviews);

  return (
    <>
      <ModalContainer
        isActive={isReviewFormModalOpen}
        onClose={handleReviewFormClose}
        testId="modal-review-form"
      >
        <ModalReviewForm
          title={guitar.name}
          onClose={handleReviewFormClose}
        >
          <AddReviewForm
            guitarId={guitar.id}
            onSuccessSubmitting={() => {
              setIsReviewFormModalOpen(false);
              setIsSuccessReviewModalOpen(true);
            }}
          />
        </ModalReviewForm>
      </ModalContainer>

      <ModalContainer
        isActive={isSuccessReviewModalOpen}
        onClose={handleSuccessReviewClose}
        testId="modal-success-review"
      >
        <ModalSuccessReview
          onClose={handleSuccessReviewClose}
        />
      </ModalContainer>

      <section className="reviews">
        {withReviews && (
          <h3 className="reviews__title title title--bigger">Отзывы</h3>
        )}

        <button
          className={classNames(
            'button',
            'button--red-border',
            'button--big',
            'reviews__sumbit-button',
            styles.Reviews_submitButton,
          )}
          onClick={handleAddReviewLink}
          data-testid="button-add-review"
        >
          Оставить отзыв
        </button>

        {shownReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}

        {isMoreReviews && (
          <button
            ref={buttonRef}
            className="button button--medium reviews__more-button"
            onClick={showMoreReviews}
          >
            Показать еще отзывы
          </button>
        )}

        {withReviews && (
          <a
            className={classNames(
              'button',
              'button--up',
              'button--red-border',
              'button--big',
              'reviews__up-button',
              styles.Reviews_upButton,
            )}
            href="#header"
          >
            Наверх
          </a>
        )}
      </section>
    </>
  );
}

export default ReviewSection;
