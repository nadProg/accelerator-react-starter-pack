import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import BasketLink from './basket-link';

const mockHistory = createMemoryHistory();

describe('Component: BasketLink', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <BasketLink />
      </Router>,
    );
  });
});
