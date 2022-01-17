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
  AddReviewFormField,
  INITIAL_FORM_ERRORS,
  INITIAL_FORM_FIELDS,
  RATING_OPTIONS
} from '../../constants/add-review-form';
import { FetchStatus } from '../../constants/common';
import { setNewCommentStatus } from '../../store/comments/comments-actions';
import { postComment } from '../../store/comments/comments-api-actions';
import { getNewCommentStatus } from '../../store/comments/comments-selector';
import { Guitar } from '../../types/guitar';

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
  const newCommentFetchStatus = useSelector(getNewCommentStatus);

  useEffect(() => {
    switch (newCommentFetchStatus) {
      case FetchStatus.Succeeded:
        onSuccessSubmitting();
        break;

      case FetchStatus.Failed:
        toast.error('Не удалось отправить отзыв');
        break;

      default:
        break;
    }
  }, [newCommentFetchStatus]);

  useEffect(
    () => () => {
      dispatch(setNewCommentStatus(FetchStatus.Idle));
    },
    [],
  );

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (evt) => {
    const { value, name } = evt.target;

    const parsedValue =
      typeof formFields[name as AddReviewFormField] === 'number'
        ? Number(value)
        : value;

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: parsedValue,
    }));

    if (formErrors[name as AddReviewFormField] !== undefined) {
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

    dispatch(postComment(formFields));
  };

  const isUserNameErrorShown = isFormDirty && formErrors.userName;
  const isRatingErrorShown = isFormDirty && formErrors.rating;

  const isSubmitting = newCommentFetchStatus === FetchStatus.Loading;

  return (
    <form className="form-review" onSubmit={handleSubmit}>
      <div className="form-review__wrapper">
        <div className="form-review__name-wrapper">
          <label
            className="form-review__label form-review__label--required"
            htmlFor="user-name"
          >
            Ваше Имя
          </label>
          <input
            className="form-review__input form-review__input--name"
            id="user-name"
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
      <label className="form-review__label" htmlFor="user-name">
        Достоинства
      </label>
      <input
        className="form-review__input"
        id="pros"
        type="text"
        autoComplete="off"
        name="advantage"
        value={formFields.advantage}
        onChange={handleInputChange}
      />
      <label className="form-review__label" htmlFor="user-name">
        Недостатки
      </label>
      <input
        className="form-review__input"
        id="user-name"
        type="text"
        autoComplete="off"
        name="disadvantage"
        value={formFields.disadvantage}
        onChange={handleInputChange}
      />
      <label className="form-review__label" htmlFor="user-name">
        Комментарий
      </label>
      <textarea
        className="form-review__input form-review__input--textarea"
        id="user-name"
        rows={10}
        autoComplete="off"
        name="comment"
        value={formFields.comment}
        onChange={handleInputChange}
      >
      </textarea>
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
