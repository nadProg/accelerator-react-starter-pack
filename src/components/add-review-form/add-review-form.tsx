import classNames from 'classnames';
import {
  ChangeEventHandler,
  FormEventHandler,
  Fragment,
  useEffect,
  useState
} from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  NewReviewFormFields,
  INITIAL_FORM_ERRORS,
  INITIAL_FORM_FIELDS,
  RATING_OPTIONS
} from '../../constants/add-review-form';
import { FetchStatus } from '../../constants/common';
import { setNewReviewStatus } from '../../store/reviews/reviews-actions';
import { postReview } from '../../store/reviews/reviews-api-actions';
import { getNewReviewStatus } from '../../store/reviews/reviews-selector';
import { Guitar } from '../../types/guitar';
import { isFetchLoading } from '../../utils/fetched-data';
import styles from './add-review-form.module.css';

type AddReviewFormProps = {
  guitarId: Guitar['id'];
  onSuccessSubmitting: () => void;
};

function AddReviewForm({
  onSuccessSubmitting,
  guitarId,
}: AddReviewFormProps): JSX.Element {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [formErrors, setFormErrors] = useState(INITIAL_FORM_ERRORS);
  const [formFields, setFormFields] = useState({
    ...INITIAL_FORM_FIELDS,
    guitarId,
  });

  const dispatch = useDispatch();
  const newReviewFetchStatus = useSelector(getNewReviewStatus);

  useEffect(() => {
    switch (newReviewFetchStatus) {
      case FetchStatus.Succeeded:
        onSuccessSubmitting();
        break;

      case FetchStatus.Failed:
        toast.error('Не удалось отправить отзыв');
        break;

      default:
        break;
    }
  }, [newReviewFetchStatus]);

  useEffect(
    () => () => {
      dispatch(setNewReviewStatus(FetchStatus.Idle));
    },
    [],
  );

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (evt) => {
    const { value, name } = evt.target;

    const parsedValue =
      typeof formFields[name as NewReviewFormFields] === 'number'
        ? Number(value)
        : value;

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: parsedValue,
    }));

    if (formErrors[name as NewReviewFormFields] !== undefined) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !value,
      }));
    }
  };

  const isFormValid = (() =>
    Object.values(formErrors).every((error) => !error))();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    setIsFormDirty(true);

    if (!isFormValid) {
      return;
    }

    dispatch(postReview(formFields));
  };

  const isUserNameErrorShown = isFormDirty && formErrors.userName;
  const isRatingErrorShown = isFormDirty && formErrors.rating;
  const isAdvantageErrorShown = isFormDirty && formErrors.advantage;
  const isDisadvantageErrorShown = isFormDirty && formErrors.disadvantage;
  const isCommentErrorShown = isFormDirty && formErrors.comment;

  const isSubmitting = isFetchLoading(newReviewFetchStatus);

  return (
    <form className="form-review" onSubmit={handleSubmit}>
      <div className="form-review__wrapper">
        <div className="form-review__name-wrapper">
          <label
            className="form-review__label form-review__label--required"
            htmlFor="userName"
          >
            Ваше Имя
          </label>
          <input
            className="form-review__input form-review__input--name"
            id="userName"
            type="text"
            autoComplete="off"
            name="userName"
            value={formFields.userName}
            onChange={handleInputChange}
          />
          {isUserNameErrorShown && (
            <span className="form-review__warning" data-testid="username-error">
              Заполните поле
            </span>
          )}
        </div>
        <div>
          <span className="form-review__label form-review__label--required">
            Ваша Оценка
          </span>
          <div className="rate rate--reverse">
            {RATING_OPTIONS.map(({ value, label }) => {
              const id = `star-${value}`;

              return (
                <Fragment key={id}>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id={id}
                    name="rating"
                    value={value}
                    checked={value === formFields.rating}
                    onChange={handleInputChange}
                  />
                  <label className="rate__label" htmlFor={id} title={label}>
                    <span className="visually-hidden">{label}</span>
                  </label>
                </Fragment>
              );
            })}
            <span className="rate__count"></span>
            {isRatingErrorShown && (
              <span className="rate__message" data-testid="rating-error">
                Поставьте оценку
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.FormReview_inputWrapper__column}>
        <label
          className={classNames(
            'form-review__label',
            'form-review__label--required',
          )}
          htmlFor="advantage"
        >
          Достоинства
        </label>
        <input
          className={classNames('form-review__input', styles.FormReview_input)}
          id="advantage"
          type="text"
          autoComplete="off"
          name="advantage"
          value={formFields.advantage}
          onChange={handleInputChange}
        />
        {isAdvantageErrorShown && (
          <span className="form-review__warning" data-testid="advantage-error">
            Заполните поле
          </span>
        )}
      </div>
      <div className={styles.FormReview_inputWrapper__column}>
        <label
          className={classNames(
            'form-review__label',
            'form-review__label--required',
          )}
          htmlFor="disadvantage"
        >
        Недостатки
        </label>
        <input
          className={classNames('form-review__input', styles.FormReview_input)}
          id="disadvantage"
          type="text"
          autoComplete="off"
          name="disadvantage"
          value={formFields.disadvantage}
          onChange={handleInputChange}
        />
        {isDisadvantageErrorShown && (
          <span className="form-review__warning" data-testid="disadvantage-error">
          Заполните поле
          </span>
        )}
      </div>
      <div className={styles.FormReview_inputWrapper__column}>
        <label
          className={classNames(
            'form-review__label',
            'form-review__label--required',
          )}
          htmlFor="comment"
        >
        Комментарий
        </label>
        <textarea
          className={classNames(
            'form-review__input',
            'form-review__input--textarea',
            styles.FormReview_input,
          )}
          id="comment"
          rows={10}
          autoComplete="off"
          name="comment"
          value={formFields.comment}
          onChange={handleInputChange}
        >
        </textarea>
        {isCommentErrorShown && (
          <span className="form-review__warning" data-testid="comment-error">
          Заполните поле
          </span>
        )}
      </div>
      <button
        className="button button--medium-20 form-review__button"
        type="submit"
        data-testid="submit-new-review"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
      </button>
    </form>
  );
}

export default AddReviewForm;
