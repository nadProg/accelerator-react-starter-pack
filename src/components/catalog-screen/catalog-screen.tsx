import classNames from 'classnames';
import { NavLink, Redirect } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { usePageNumberParam } from '../../hooks/use-page-number-param';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogPage from '../catalog-page/catalog-page';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import CatalogSort from '../catalog-sort/catalog-sort';
import styles from './catalog-screen.module.css';

function CatalogScreen(): JSX.Element {
  const { pageNumber, error } = usePageNumberParam();

  if (pageNumber === undefined || error) {
    return <Redirect to={AppRoute.NotFound()} />;
  }

  return (
    <>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <NavLink className="link" to={AppRoute.Root()}>
            Главная
          </NavLink>
        </li>
        <li className="breadcrumbs__item">
          <a className="link">Каталог</a>
        </li>
      </ul>
      <div className="catalog">
        <CatalogFilter />
        <CatalogSort />
        <div className={classNames('cards', 'catalog__cards', styles.cards)}>
          <CatalogPage />
        </div>
        <CatalogPagination />
      </div>
    </>
  );
}

export default CatalogScreen;
