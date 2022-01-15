import { MouseEventHandler, useMemo, useState } from 'react';
import { COMMENTS_PAGE_SIZE } from '../../constants/comment';
import { CommentGet } from '../../types/comment';
import { sortByDate } from '../../utils/comment';
import AddReviewForm from '../add-review-form/add-review-form';
import ModalReviewForm from '../modal-review-form/modal-review-form';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import Review from '../review/review';

type ReviewSectionProps = {
  reviews: CommentGet[];
};

const INITIAL_PAGE = 1;

function ReviewSection({ reviews }: ReviewSectionProps): JSX.Element {
  const [isReviewFormModalOpen, setIsReviewFormModalOpen] = useState(false);
  const [isSuccessReviewModalOpen, setIsSuccessReviewModalOpen] =
    useState(false);

  const handleAddReviewLink: MouseEventHandler = (evt) => {
    evt.preventDefault();
    setIsReviewFormModalOpen(true);
  };

  const sortedReviews = useMemo(() => sortByDate(reviews), [reviews]);

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const increasePage = () => setCurrentPage((prevPage) => prevPage + 1);
  const isMore = sortedReviews.length > currentPage * COMMENTS_PAGE_SIZE;
  const shownReviews = sortedReviews.slice(0, currentPage * COMMENTS_PAGE_SIZE);

  return (
    <>
      {isReviewFormModalOpen && (
        <ModalReviewForm onClose={() => setIsReviewFormModalOpen(false)}>
          <AddReviewForm
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
        <h3 className="reviews__title title title--bigger">Отзывы</h3>
        <a
          className="button button--red-border button--big reviews__sumbit-button"
          href="#"
          onClick={handleAddReviewLink}
          data-testid="button-add-review"
        >
          Оставить отзыв
        </a>

        {shownReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}

        {isMore && (
          <button
            className="button button--medium reviews__more-button"
            onClick={() => increasePage()}
          >
            Показать еще отзывы
          </button>
        )}

        <a
          className="button button--up button--red-border button--big reviews__up-button"
          style={{ zIndex: 1 }}
          href="#header"
        >
          Наверх
        </a>
      </section>
    </>
  );
}

export default ReviewSection;
