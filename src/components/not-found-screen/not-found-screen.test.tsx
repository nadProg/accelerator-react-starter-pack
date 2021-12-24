import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NotFoundScreen from './not-found-screen';

const mockHistory = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <NotFoundScreen />
      </Router>,
    );
  });
});
