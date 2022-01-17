import { ReviewGet } from '../../types/review';
import { formatReviewDate } from '../../utils/date';
import Rating from '../rating/rating';

type ReviewProps = {
  review: ReviewGet;
};

function Review({ review }: ReviewProps) {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {review.userName}
        </h4>
        <span className="review__date">{formatReviewDate(review.createAt)}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true">
        <span className="visually-hidden">Рейтинг:</span>
        <Rating value={review.rating} />
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">
        {review.advantage}
      </p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{review.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">
        {review.comment}
      </p>
    </div>
  );
}

export default Review;
