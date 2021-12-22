import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NotFoundPage from './not-found-page';

const mockHistory = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <NotFoundPage />
      </Router>,
    );
  });
});
