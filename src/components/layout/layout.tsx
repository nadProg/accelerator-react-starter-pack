import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren<Record<never, never>>): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header" id="header">
        <div className="container header__wrapper">
          <a className="header__logo logo">
            <img
              className="logo__img"
              width="70"
              height="70"
              src="./img/svg/logo.svg"
              alt="Логотип"
            />
          </a>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li>
                <a className="link main-nav__link link--current" href="#">
                Каталог
                </a>
              </li>
              <li>
                <a className="link main-nav__link" href="#">
                Где купить?
                </a>
              </li>
              <li>
                <a className="link main-nav__link" href="#">
                О компании
                </a>
              </li>
            </ul>
          </nav>
          <div className="form-search">
            <form className="form-search__form">
              <button className="form-search__submit" type="submit">
                <svg
                  className="form-search__icon"
                  width="14"
                  height="15"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-search"></use>
                </svg>
                <span className="visually-hidden">Начать поиск</span>
              </button>
              <input
                className="form-search__input"
                id="search"
                type="text"
                autoComplete="off"
                placeholder="что вы ищите?"
              />
              <label className="visually-hidden" htmlFor="search">
              Поиск
              </label>
            </form>
            <ul className="form-search__select-list hidden">
              <li className="form-search__select-item" tabIndex={0}>
              Четстер Plus
              </li>
              <li className="form-search__select-item" tabIndex={0}>
              Четстер UX
              </li>
              <li className="form-search__select-item" tabIndex={0}>
              Четстер UX2
              </li>
              <li className="form-search__select-item" tabIndex={0}>
              Четстер UX3
              </li>
              <li className="form-search__select-item" tabIndex={0}>
              Четстер UX4
              </li>
              <li className="form-search__select-item" tabIndex={0}>
              Четстер UX5
              </li>
            </ul>
          </div>
          <a className="header__cart-link" href="#" aria-label="Корзина">
            <svg
              className="header__cart-icon"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-basket"></use>
            </svg>
            <span className="visually-hidden">Перейти в корзину</span>
            <span className="header__cart-count">2</span>
          </a>
        </div>
      </header>
      <main className="page-content">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="footer__container container">
          <a className="footer__logo logo">
            <img
              className="logo__img"
              width="70"
              height="70"
              src="./img/svg/logo.svg"
              alt="Логотип"
            />
          </a>
          <div className="socials footer__socials">
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
          <section className="footer__nav-section footer__nav-section--info">
            <h2 className="footer__nav-title">О нас</h2>
            <p className="footer__nav-content footer__nav-content--font-secondary">
            Магазин гитар, музыкальных инструментов и гитарная мастерская
              <br />
            в Санкт-Петербурге.
              <br />
              <br />
            Все инструменты проверены, отстроены <br />и доведены до идеала!
            </p>
          </section>
          <section className="footer__nav-section footer__nav-section--links">
            <h2 className="footer__nav-title">Информация</h2>
            <ul className="footer__nav-list">
              <li className="footer__nav-list-item">
                <a className="link" href="#top">
                Где купить?
                </a>
              </li>
              <li className="footer__nav-list-item">
                <a className="link" href="#top">
                Блог
                </a>
              </li>
              <li className="footer__nav-list-item">
                <a className="link" href="#top">
                Вопрос - ответ
                </a>
              </li>
              <li className="footer__nav-list-item">
                <a className="link" href="#top">
                Возврат
                </a>
              </li>
              <li className="footer__nav-list-item">
                <a className="link" href="#top">
                Сервис-центры
                </a>
              </li>
            </ul>
          </section>
          <section className="footer__nav-section footer__nav-section--contacts">
            <h2 className="footer__nav-title">Контакты</h2>
            <p className="footer__nav-content">
            г. Санкт-Петербург,
              <br />
            м. Невский проспект, <br />
            ул. Казанская 6.
            </p>
            <div className="footer__nav-content">
              <svg
                className="footer__icon"
                width="8"
                height="8"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-phone"></use>
              </svg>
              <a className="link" href="tel:88125005050">
                {' '}
              8-812-500-50-50
              </a>
            </div>
            <p className="footer__nav-content">
            Режим работы:
              <br />
              <span className="footer__span">
                <svg
                  className="footer__icon"
                  width="13"
                  height="13"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-clock"></use>
                </svg>
                <span> с 11:00 до 20:00</span>
                <span>без выходных</span>
              </span>
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
