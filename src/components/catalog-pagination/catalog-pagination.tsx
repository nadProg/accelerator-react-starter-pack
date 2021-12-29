import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { AppRoute } from '../../constants/endpoints';
import {
  CATALOG_PAGINATION_SPAN,
  CATALOG_PAGINATION_STEP
} from '../../constants/pagination';
import { useDebounce } from '../../hooks/use-debounce';
import { usePageNumberParam } from '../../hooks/use-page-number-param';
import { setCatalogGuitarsStatus } from '../../store/guitars/guitars-actions';
import {
  setPaginationCurrentPage,
  setPaginationMaxPage
} from '../../store/pagination/pagination-actions';
import {
  getPaginationMaxPage,
  getPaginationMinPage
} from '../../store/pagination/pagination-selectors';

function CatalogPagination(): JSX.Element {
  const { search } = useLocation();
  const currentPageNumber = usePageNumberParam().pageNumber as number;
  const minPageNumber = useSelector(getPaginationMinPage);
  const maxPageNumber = useSelector(getPaginationMaxPage);

  const dispatch = useDispatch();

  const fetchCatalogGuitarsDebounced = useDebounce(() =>
    dispatch(setCatalogGuitarsStatus(FetchStatus.Idle)),
  );

  const getPagePathWithSearchParams = (pageNumber: number) =>
    `${AppRoute.CatalogPage(pageNumber)}${search}`;

  useEffect(() => {
    dispatch(setPaginationMaxPage(currentPageNumber));
  }, []);

  useEffect(() => {
    dispatch(setPaginationCurrentPage(currentPageNumber));
    fetchCatalogGuitarsDebounced();
  }, [currentPageNumber]);

  const startPage =
    (Math.ceil(currentPageNumber / CATALOG_PAGINATION_SPAN) - 1) *
      CATALOG_PAGINATION_SPAN +
    1;

  const isPrevButtonVisible =
    currentPageNumber - CATALOG_PAGINATION_STEP >= minPageNumber;
  const isNextButtonVisible =
    currentPageNumber + CATALOG_PAGINATION_STEP <= maxPageNumber;

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {isPrevButtonVisible && (
          <li className="pagination__page pagination__page--prev" id="prev">
            <NavLink
              className="link pagination__page-link"
              to={getPagePathWithSearchParams(
                currentPageNumber - CATALOG_PAGINATION_STEP,
              )}
              data-testid="prev-page-link"
            >
              Назад
            </NavLink>
          </li>
        )}

        {new Array(CATALOG_PAGINATION_SPAN).fill(null).map((_item, index) => {
          const pageNumber = index + startPage;

          if (pageNumber < minPageNumber || pageNumber > maxPageNumber) {
            return null;
          }

          return (
            <li
              key={pageNumber}
              className={classNames('pagination__page', {
                'pagination__page--active': pageNumber === currentPageNumber,
              })}
            >
              <NavLink
                className="link pagination__page-link"
                to={getPagePathWithSearchParams(pageNumber)}
                data-testid={`${pageNumber}-page-link`}
              >
                {pageNumber}
              </NavLink>
            </li>
          );
        })}

        {isNextButtonVisible && (
          <li className="pagination__page pagination__page--next" id="next">
            <NavLink
              className="link pagination__page-link"
              to={getPagePathWithSearchParams(
                currentPageNumber + CATALOG_PAGINATION_STEP,
              )}
              data-testid="next-page-link"
            >
              Далее
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default CatalogPagination;
