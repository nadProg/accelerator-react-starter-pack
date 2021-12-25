import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { COMMENTS_PAGE_SIZE } from '../../constants/comment';
import { FetchStatus } from '../../constants/common';
import { AppRoute } from '../../constants/endpoints';
import { HumanizedGuitar } from '../../constants/guitar';
import { useIdParam } from '../../hooks/use-id-param';
import { useReactiveRef } from '../../hooks/use-reactive-ref';
import { setCurrentGuitarStatus } from '../../store/guitars/guitars-actions';
import { getCurrentGuitar } from '../../store/guitars/guitars-api-actions';
import {
  getCurrentGuitarData,
  getCurrentGuitarStatus
} from '../../store/guitars/guitars-selectors';
import {
  isFetchError,
  isFetchNotReady
} from '../../utils/fetched-data';
import Loader from '../loader/loader';
import Rating from '../rating/rating';
import Review from '../review/review';

function CardScreen(): JSX.Element {
  const { id: guitarId, error } = useIdParam();

  const guitar = useSelector(getCurrentGuitarData);
  const guitarStatus = useSelector(getCurrentGuitarStatus);
  const guitarStatusRef = useReactiveRef(guitarStatus);

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      if (isFetchError(guitarStatusRef.current)) {
        dispatch(setCurrentGuitarStatus(FetchStatus.Idle));
      }
    },
    [],
  );

  useEffect(() => {
    if (!guitarId) {
      return;
    }

    if (!guitar?.id || guitar.id !== guitarId) {
      dispatch(getCurrentGuitar(guitarId));
    }
  }, [guitar?.id, guitarId]);

  if (error || isFetchError(guitarStatus)) {
    return <Redirect to={AppRoute.NotFound()} />;
  }

  if (isFetchNotReady(guitarStatus)) {
    return <Loader />;
  }

  if (!guitar) {
    return <Redirect to={AppRoute.NotFound()} />;
  }

  return (
    <>
      <h1 className="page-content__title title title--bigger">Товар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <NavLink className="link" to={AppRoute.Root()}>
            Главная
          </NavLink>
        </li>
        <li className="breadcrumbs__item">
          <NavLink className="link" to={AppRoute.Catalog()}>
            Каталог
          </NavLink>
        </li>
        <li className="breadcrumbs__item">
          <a className="link">Товар</a>
        </li>
      </ul>
      <div className="product-container">
        <img
          className="product-container__img"
          src={`/${guitar.previewImg}`}
          width="90"
          height="235"
          alt={guitar.name}
        />
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">
            {guitar.name}
          </h2>
          <div className="rate product-container__rating" aria-hidden="true">
            <span className="visually-hidden">Рейтинг:</span>
            <Rating value={guitar.rating} />
          </div>
          <div className="tabs">
            <a
              className="button button--medium tabs__button"
              href="#characteristics"
            >
              Характеристики
            </a>
            <a
              className="button button--black-border button--medium tabs__button"
              href="#description"
            >
              Описание
            </a>
            <div className="tabs__content" id="characteristics">
              <table className="tabs__table">
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{guitar.vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">
                    {HumanizedGuitar[guitar.type]}
                  </td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{guitar.stringCount} струнная</td>
                </tr>
              </table>
              <p className="tabs__product-description hidden">
                {guitar.description}
              </p>
            </div>
          </div>
        </div>
        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">
            Цена:
          </p>
          <p className="product-container__price-info product-container__price-info--value">
            {guitar.price} ₽
          </p>
          <a
            className="button button--red button--big product-container__button"
            href="#"
          >
            Добавить в корзину
          </a>
        </div>
      </div>
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">Отзывы</h3>
        <a
          className="button button--red-border button--big reviews__sumbit-button"
          href="#"
        >
          Оставить отзыв
        </a>

        {guitar.comments.slice(0, COMMENTS_PAGE_SIZE).map((comment) => <Review key={comment.id} review={comment} />)}

        <button className="button button--medium reviews__more-button">
          Показать еще отзывы
        </button>
        <a
          className="button button--up button--red-border button--big reviews__up-button"
          href="#header"
        >
          Наверх
        </a>
      </section>
    </>
  );
}

export default CardScreen;