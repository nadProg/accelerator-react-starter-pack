import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { AppRoute } from '../../constants/constants';

const ACTIVE_CLASS = 'link--current';

function MainNavigation() {
  const { pathname } = useLocation();

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li>
          <NavLink
            className={classNames('main-nav__link', 'link', {
              [ACTIVE_CLASS]: pathname.includes(AppRoute.Catalog()),
            })}
            to={AppRoute.Catalog}
            exact
          >
            Каталог
          </NavLink>
        </li>
        <li>
          <NavLink
            className="main-nav__link link"
            to="#"
            exact
          >
            Каталог
          </NavLink>
        </li>
        <li>
          <NavLink
            className="main-nav__link link"
            to="#"
            exact
          >
            Каталог
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;