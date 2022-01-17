import { MouseEventHandler, useMemo, useRef, useState } from 'react';
import { COMMENTS_PAGE_SIZE } from '../../constants/comment';
import { useIntersection } from '../../hooks/use-intersection';
import { useShowMore } from '../../hooks/use-show-more';
import { GuitarWithComments } from '../../types/guitar';
import { sortByDate } from '../../utils/comment';
import AddReviewForm from '../add-review-form/add-review-form';
import ModalReviewForm from '../modal-review-form/modal-review-form';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import Review from '../review/review';

type ReviewSectionProps = {
  guitar: GuitarWithComments;
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
    size: COMMENTS_PAGE_SIZE,
  });

  const handleAddReviewLink: MouseEventHandler = (evt) => {
    evt.preventDefault();
    setIsReviewFormModalOpen(true);
  };

  const withReviews = Boolean(guitar.comments.length);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useIntersection(buttonRef, showMoreReviews);

  return (
    <>
      {isReviewFormModalOpen && (
        <ModalReviewForm
          title={guitar.name}
          onClose={() => setIsReviewFormModalOpen(false)}
        >
          <AddReviewForm
            guitarId={guitar.id}
            onSuccessSubmitting={() => {
              setIsReviewFormModalOpen(false);
              setIsSuccessReviewModalOpen(true);
            }}
          />
        </ModalReviewForm>
      )}

      {isSuccessReviewModalOpen && (
        <ModalSuccessReview
          onClose={() => {
            setIsSuccessReviewModalOpen(false);
          }}
        />
      )}

      <section className="reviews">
        {withReviews && (
          <h3 className="reviews__title title title--bigger">Отзывы</h3>
        )}

        <a
          className="button button--red-border button--big reviews__sumbit-button"
          href="#"
          onClick={handleAddReviewLink}
          data-testid="button-add-review"
          style={{ zIndex: 1 }}
        >
          Оставить отзыв
        </a>

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
            className="button button--up button--red-border button--big reviews__up-button"
            style={{ zIndex: 1 }}
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
