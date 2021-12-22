import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import MainNavigation from './main-navigation';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation() {
    return {
      pathname: '',
    };
  },
}));

const mockHistory = createMemoryHistory();

describe('Component: MainNavigation', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <MainNavigation />
      </Router>,
    );
  });
});
