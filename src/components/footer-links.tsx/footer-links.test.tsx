import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FooterLinks from './footer-links';

const mockHistory = createMemoryHistory();

describe('Component: FooterLinks', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <FooterLinks />
      </Router>,
    );
  });
});
