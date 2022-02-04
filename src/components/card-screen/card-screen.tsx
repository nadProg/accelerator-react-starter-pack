import classNames from 'classnames';
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { AppRoute } from '../../constants/endpoints';
import {
  GuitarTab,
  HumanizedGuitar,
  HumanizedGuitarTab
} from '../../constants/guitar';
import { useIdParam } from '../../hooks/use-id-param';
import { useReactiveRef } from '../../hooks/use-reactive-ref';
import { setCurrentGuitarStatus } from '../../store/guitars/guitars-actions';
import { getCurrentGuitar } from '../../store/guitars/guitars-api-actions';
import {
  getCurrentGuitarData,
  getCurrentGuitarStatus
} from '../../store/guitars/guitars-selectors';
import { GuitarTabType } from '../../types/guitar';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import { formatPrice, getRating } from '../../utils/guitar';
import InfoScreen from '../info-screen/info-screen';
import Loader from '../loader/loader';
import ModalAddCart from '../modal-add-cart/modal-add-cart';
import Rating from '../rating/rating';
import ReviewSection from '../review-section/review-section';

function CardScreen(): JSX.Element {
  const { id: guitarId, error } = useIdParam();

  const [isModalAddCartOpen, setIsModalCardAddOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState<GuitarTabType>(
    GuitarTab.Characteristics,
  );

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

  const rating = useMemo(() => getRating(guitar), [guitar]);

  if (error) {
    return <Redirect to={AppRoute.NotFound()} />;
  }

  if (isFetchError(guitarStatus)) {
    return (
      <InfoScreen>
        <div data-testid="card-error-message">
          <h1>Ошибка загрузки!</h1>
          <p>Не удалось загрузить карточку товара</p>
          <NavLink to={AppRoute.Catalog()}>Вернуться в каталог</NavLink>
        </div>
      </InfoScreen>
    );
  }

  if (isFetchNotReady(guitarStatus)) {
    return <Loader />;
  }

  if (!guitar) {
    return <Redirect to={AppRoute.NotFound()} />;
  }

  const guitarTabContent = {
    [GuitarTab.Characteristics]: () => (
      <table className="tabs__table">
        <tbody>
          <tr className="tabs__table-row">
            <td className="tabs__title">Артикул:</td>
            <td className="tabs__value">{guitar.vendorCode}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Тип:</td>
            <td className="tabs__value">{HumanizedGuitar[guitar.type]}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Количество струн:</td>
            <td className="tabs__value">{guitar.stringCount} струнная</td>
          </tr>
        </tbody>
      </table>
    ),
    [GuitarTab.Description]: () => (
      <p className="tabs__product-description">{guitar.description}</p>
    ),
  };

  const handleAddToCartLink: MouseEventHandler = (evt) => {
    evt.preventDefault();
    setIsModalCardAddOpen(true);
  };

  const handleModalAddCartClose = () => {
    setIsModalCardAddOpen(false);
  };

  return (
    <>
      <ModalAddCart guitar={guitar} isActive={isModalAddCartOpen} onClose={handleModalAddCartClose} />

      <h1 className="page-content__title title title--bigger">{guitar.name}</h1>

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
          <a className="link">{guitar.name}</a>
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
            <Rating value={rating} />
            <span className="rate__count">{guitar.comments.length}</span>
          </div>

          <div className="tabs">
            {Object.values(GuitarTab).map((guitarTab) => (
              <a
                key={guitarTab}
                className={classNames(
                  'button',
                  'button--medium',
                  'tabs__button',
                  {
                    'button--black-border': currentTab !== guitarTab,
                  },
                )}
                href={`#${guitarTab}`}
                onClick={(evt) => {
                  evt.preventDefault();
                  setCurrentTab(guitarTab);
                }}
                data-testid={`${guitarTab}-tab-control`}
              >
                {HumanizedGuitarTab[guitarTab]}
              </a>
            ))}
            <div
              className="tabs__content"
              id={currentTab}
              data-testid={`${currentTab}-tab-content`}
            >
              {guitarTabContent[currentTab]()}
            </div>
          </div>
        </div>

        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">
            Цена:
          </p>
          <p className="product-container__price-info product-container__price-info--value">
            {formatPrice(guitar.price)} ₽
          </p>
          <button
            className="button button--red button--big product-container__button"
            onClick={handleAddToCartLink}
            data-testid="button-add-to-cart"
          >
            Добавить в корзину
          </button>
        </div>
      </div>

      <ReviewSection guitar={guitar} />
    </>
  );
}

export default CardScreen;
