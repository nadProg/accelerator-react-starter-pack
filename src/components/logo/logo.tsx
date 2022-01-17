import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants/endpoints';
import { PropsWithClassName } from '../../types/props';

const BASE_CLASS = 'logo';

function Logo({ className }: PropsWithClassName): JSX.Element {
  return (
    <NavLink className={classNames(BASE_CLASS, className)} to={AppRoute.Root()}>
      <img
        className="logo__img"
        width="70"
        height="70"
        src="/img/svg/logo.svg"
        alt="Логотип"
      />
    </NavLink>
  );
}

export default Logo;
