import classNames from 'classnames';
import { PropsWithClassName } from '../../types/props';

const BASE_CLASS = 'logo';

function Logo({ className }: PropsWithClassName): JSX.Element {
  return (
    <a className={classNames(BASE_CLASS, className)}>
      <img
        className="logo__img"
        width="70"
        height="70"
        src="/img/svg/logo.svg"
        alt="Логотип"
      />
    </a>
  );
}

export default Logo;
