import { PropsWithChildren } from '../../types/types';
import BasketLink from '../basket-link/basket-link';
import FooterContacts from '../footer-contacts.tsx/footer-contacts';
import FooterInfo from '../footer-info.tsx/footer-info';
import FooterLinks from '../footer-links.tsx/footer-links';
import FormSearch from '../form-search/form-search';
import Logo from '../logo/logo';
import MainNavigation from '../main-navigation.tsx/main-navigation';
import Socials from '../socials.tsx/socials';

function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header" id="header">
        <div className="container header__wrapper">
          <Logo className="header__logo" />
          <MainNavigation />
          <FormSearch />
          <BasketLink className="header__cart-link"></BasketLink>
        </div>
      </header>
      <main className="page-content">
        <div className="container">{children}</div>
      </main>
      <footer className="footer">
        <div className="footer__container container">
          <Logo className="footer__logo" />
          <Socials className="footer__socials" />
          <FooterInfo />
          <FooterLinks />
          <FooterContacts />
        </div>
      </footer>
    </div>
  );
}

export default Layout;
