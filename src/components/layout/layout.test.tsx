import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Layout from './layout';

const mockHistory = createMemoryHistory();

describe('Component: MainNavigation', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <Layout />
      </Router>,
    );
  });
});
