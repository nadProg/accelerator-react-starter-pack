import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';

function CatalogPagination(): JSX.Element {
  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        <li className="pagination__page pagination__page--active">
          <NavLink className="link pagination__page-link" to={AppRoute.CatalogPage(1)}>
            1
          </NavLink>
        </li>
        <li className="pagination__page">
          <NavLink className="link pagination__page-link" to={AppRoute.CatalogPage(2)}>
            2
          </NavLink>
        </li>
        <li className="pagination__page">
          <NavLink className="link pagination__page-link" to={AppRoute.CatalogPage(3)}>
            3
          </NavLink>
        </li>
        <li className="pagination__page pagination__page--next" id="next">
          <NavLink className="link pagination__page-link"to={AppRoute.CatalogPage(4)}>
            Далее
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default CatalogPagination;
