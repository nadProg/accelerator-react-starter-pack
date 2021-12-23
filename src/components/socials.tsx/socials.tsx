import classNames from 'classnames';
import { PropsWithClassName } from '../../types/props';

function Socials({ className }: PropsWithClassName) {
  return (
    <div className={classNames('socials', className)}>
      <ul className="socials__list">
        <li className="socials-item">
          <a
            className="socials__link"
            href="https://www.facebook.com/"
            aria-label="facebook"
          >
            <svg
              className="socials__icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li className="socials-item">
          <a
            className="socials__link"
            href="https://www.instagram.com/"
            aria-label="instagram"
          >
            <svg
              className="socials__icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-instagram"></use>
            </svg>
          </a>
        </li>
        <li className="socials-item">
          <a
            className="socials__link"
            href="https://www.twitter.com/"
            aria-label="twitter"
          >
            <svg
              className="socials__icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-twitter"></use>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Socials;
