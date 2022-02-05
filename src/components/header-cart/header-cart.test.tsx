import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import HeaderCart from './header-cart';

const mockHistory = createMemoryHistory();

describe('Component: HeaderCart', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <HeaderCart />
      </Router>,
    );
  });
});
