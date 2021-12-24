import classNames from 'classnames';
import { CSSProperties, MouseEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from '../../constants/common';
import { Order, Type } from '../../constants/sort';
import { setCatalogGuitarsStatus } from '../../store/guitars/guitars-actions';
import { setSortOrder, SetSortType } from '../../store/sort/sort-actions';
import { getSortOrder, getSortType } from '../../store/sort/sort-selectors';
import { OrderType, SortType } from '../../types/sort';

const FONT_WEIGHT_BOLD: CSSProperties = {
  fontWeight: 700,
};

const SEMI_TRANSPARENT: CSSProperties = {
  opacity: 0.5,
};

const INACTIVE_TAB_INDEX = -1;

function CatalogSort(): JSX.Element {
  const sortType = useSelector(getSortType);
  const sortOrder = useSelector(getSortOrder);

  const dispatch = useDispatch();

  const isCurrentSortType = (type: SortType) => type === sortType;
  const isCurrentSortOrder = (order: OrderType) => order === sortOrder;

  const getSortTypeButtonTabIndex = (type: SortType) =>
    isCurrentSortType(type) ? INACTIVE_TAB_INDEX : undefined;
  const getOrderTypeButtonTabIndex = (order: OrderType) =>
    isCurrentSortOrder(order) ? INACTIVE_TAB_INDEX : undefined;

  const getSortTypeButtonDisabled = (type: SortType) =>
    isCurrentSortType(type) ? true : undefined;
  const getSortOrderButtonDisabled = (order: OrderType) =>
    isCurrentSortOrder(order) ? true : undefined;

  const getSortTypeButtonStyle = (type: SortType) =>
    isCurrentSortType(type) ? FONT_WEIGHT_BOLD : undefined;
  const getSortOrderButtonStyle = (order: OrderType) =>
    isCurrentSortOrder(order) ? undefined : SEMI_TRANSPARENT;

  const getSortTypeButtonClassName = (type: SortType) =>
    classNames('catalog-sort__type-button', {
      'catalog-sort__type-button--active': isCurrentSortType(type),
    });
  const getSortOrderUpButtonClassName = (order: OrderType) =>
    classNames('catalog-sort__order-button', 'catalog-sort__order-button--up', {
      'catalog-sort__order-button--active': isCurrentSortOrder(order),
    });
  const getSortOrderDownButtonClassName = (order: OrderType) =>
    classNames('catalog-sort__order-button', 'catalog-sort__order-button--down', {
      'catalog-sort__order-button--active': isCurrentSortOrder(order),
    });

  const handleSortTypeButtonClick: MouseEventHandler = (evt) => {
    const button = evt.currentTarget as HTMLButtonElement;
    const newSortType = button.dataset.sortType as SortType;
    dispatch(SetSortType(newSortType));
    button.blur();
  };

  const handleSortOrderButtonClick: MouseEventHandler = (evt) => {
    const button = evt.currentTarget as HTMLButtonElement;
    const newSortOrder = button.dataset.sortOrder as OrderType;
    dispatch(setSortOrder(newSortOrder));
    button.blur();
  };

  useEffect(() => {
    dispatch(setCatalogGuitarsStatus(FetchStatus.Idle));
  }, [sortType, sortOrder]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title" style={FONT_WEIGHT_BOLD}>
        Сортировать:
      </h2>
      <div className="catalog-sort__type">
        <button
          className={getSortTypeButtonClassName(Type.Price)}
          aria-label="по цене"
          data-sort-type={Type.Price}
          onClick={handleSortTypeButtonClick}
          tabIndex={getSortTypeButtonTabIndex(Type.Price)}
          style={getSortTypeButtonStyle(Type.Price)}
          disabled={getSortTypeButtonDisabled(Type.Price)}
          data-testid="price-sort-button"
        >
          по цене
        </button>
        <button
          className={getSortTypeButtonClassName(Type.Rating)}
          aria-label="по популярности"
          data-sort-type={Type.Rating}
          onClick={handleSortTypeButtonClick}
          tabIndex={getSortTypeButtonTabIndex(Type.Rating)}
          style={getSortTypeButtonStyle(Type.Rating)}
          disabled={getSortTypeButtonDisabled(Type.Rating)}
          data-testid="rating-sort-button"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={getSortOrderUpButtonClassName(Order.Ascending)}
          aria-label="По возрастанию"
          data-sort-order={Order.Ascending}
          tabIndex={getOrderTypeButtonTabIndex(Order.Ascending)}
          style={getSortOrderButtonStyle(Order.Ascending)}
          onClick={handleSortOrderButtonClick}
          disabled={getSortOrderButtonDisabled(Order.Ascending)}
          data-testid="ascending-order-button"
        >
        </button>
        <button
          className={getSortOrderDownButtonClassName(Order.Descending)}
          aria-label="По убыванию"
          data-sort-order={Order.Descending}
          tabIndex={getOrderTypeButtonTabIndex(Order.Descending)}
          style={getSortOrderButtonStyle(Order.Descending)}
          onClick={handleSortOrderButtonClick}
          disabled={getSortOrderButtonDisabled(Order.Descending)}
          data-testid="descending-order-button"
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
