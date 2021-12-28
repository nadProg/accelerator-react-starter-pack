import classNames from 'classnames';
import { MouseEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from '../../constants/common';
import { SortOrder, SortTypeValue } from '../../constants/sort';
import { useDebounce } from '../../hooks/use-debounce';
import { setCatalogGuitarsStatus } from '../../store/guitars/guitars-actions';
import { setSortOrder, SetSortType } from '../../store/sort/sort-actions';
import { getSortOrder, getSortType } from '../../store/sort/sort-selectors';
import { OrderType, SortType } from '../../types/sort';
import styles from './catalog-sort.module.css';

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

  const getSortTypeButtonClassName = (type: SortType) =>
    classNames('catalog-sort__type-button', {
      'catalog-sort__type-button--active': isCurrentSortType(type),
      [styles.fontBold]: isCurrentSortType(type),
    });
  const getSortOrderUpButtonClassName = (order: OrderType) =>
    classNames('catalog-sort__order-button', 'catalog-sort__order-button--up', {
      'catalog-sort__order-button--active': isCurrentSortOrder(order),
      [styles.semiTransparent]: !isCurrentSortOrder(order),
    });
  const getSortOrderDownButtonClassName = (order: OrderType) =>
    classNames('catalog-sort__order-button', 'catalog-sort__order-button--down', {
      'catalog-sort__order-button--active': isCurrentSortOrder(order),
      [styles.semiTransparent]: !isCurrentSortOrder(order),
    });

  const handleSortTypeButtonClick: MouseEventHandler = (evt) => {
    const button = evt.currentTarget as HTMLButtonElement;
    const newSortType = button.dataset.sortType as SortType;
    dispatch(SetSortType(newSortType));
    button.blur();

    if (!sortOrder) {
      dispatch(setSortOrder(SortOrder.Ascending));
    }
  };

  const handleSortOrderButtonClick: MouseEventHandler = (evt) => {
    const button = evt.currentTarget as HTMLButtonElement;
    const newSortOrder = button.dataset.sortOrder as OrderType;
    dispatch(setSortOrder(newSortOrder));
    button.blur();

    if (!sortType) {
      dispatch(SetSortType(SortTypeValue.Price));
    }
  };

  const fetchCatalogGuitarsDebounced = useDebounce(() => dispatch(setCatalogGuitarsStatus(FetchStatus.Idle)));

  useEffect(() => {
    fetchCatalogGuitarsDebounced();
  }, [sortType, sortOrder]);

  return (
    <div className="catalog-sort">
      <h2 className={classNames('catalog-sort__title', styles.fontBold)}>
        Сортировать:
      </h2>
      <div className="catalog-sort__type">
        <button
          className={getSortTypeButtonClassName(SortTypeValue.Price)}
          aria-label="по цене"
          data-sort-type={SortTypeValue.Price}
          onClick={handleSortTypeButtonClick}
          tabIndex={getSortTypeButtonTabIndex(SortTypeValue.Price)}
          disabled={getSortTypeButtonDisabled(SortTypeValue.Price)}
          data-testid="price-sort-button"
        >
          по цене
        </button>
        <button
          className={getSortTypeButtonClassName(SortTypeValue.Rating)}
          aria-label="по популярности"
          data-sort-type={SortTypeValue.Rating}
          onClick={handleSortTypeButtonClick}
          tabIndex={getSortTypeButtonTabIndex(SortTypeValue.Rating)}
          disabled={getSortTypeButtonDisabled(SortTypeValue.Rating)}
          data-testid="rating-sort-button"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={getSortOrderUpButtonClassName(SortOrder.Ascending)}
          aria-label="По возрастанию"
          data-sort-order={SortOrder.Ascending}
          tabIndex={getOrderTypeButtonTabIndex(SortOrder.Ascending)}
          onClick={handleSortOrderButtonClick}
          disabled={getSortOrderButtonDisabled(SortOrder.Ascending)}
          data-testid="ascending-order-button"
        >
        </button>
        <button
          className={getSortOrderDownButtonClassName(SortOrder.Descending)}
          aria-label="По убыванию"
          data-sort-order={SortOrder.Descending}
          tabIndex={getOrderTypeButtonTabIndex(SortOrder.Descending)}
          onClick={handleSortOrderButtonClick}
          disabled={getSortOrderButtonDisabled(SortOrder.Descending)}
          data-testid="descending-order-button"
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
