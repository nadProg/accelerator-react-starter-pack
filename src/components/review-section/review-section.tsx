import classNames from 'classnames';
import { MouseEventHandler, useMemo, useRef, useState } from 'react';
import { REVIEWS_PAGE_SIZE } from '../../constants/review';
import { useIntersection } from '../../hooks/use-intersection';
import { useShowMore } from '../../hooks/use-show-more';
import { GuitarWithReviews } from '../../types/guitar';
import { sortByDate } from '../../utils/review';
import ModalAddReview from '../modal-add-review/modal-add-review';
import Review from '../review/review';
import styles from './review-section.module.css';

type ReviewSectionProps = {
  guitar: GuitarWithReviews;
};

function ReviewSection({ guitar }: ReviewSectionProps): JSX.Element {
  const [isModalAddReviewOpen, setIsModalAddReviewOpen] = useState(false);

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
    setIsModalAddReviewOpen(true);
  };

  const withReviews = Boolean(guitar.comments.length);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useIntersection(buttonRef, showMoreReviews);

  return (
    <>
      <ModalAddReview isActive={isModalAddReviewOpen} onClose={() => setIsModalAddReviewOpen(false)} guitar={guitar} />

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
