import {render} from '@testing-library/react';
import FooterContacts from './footer-contacts';


describe('Component: FooterContacts', () => {
  it('should render without errors', () => {
    render(
      <FooterContacts />,
    );
  });
});
