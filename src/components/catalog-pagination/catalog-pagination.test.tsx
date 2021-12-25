
import { render
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { State } from '../../types/store';
import { createMockState } from '../../mock/state';
import CatalogPagination from './catalog-pagination';

const mockState = createMockState();

const mockHistory = createMemoryHistory();

const mockStore = configureMockStore<State>()(mockState);

mockStore.dispatch = jest.fn();

describe('Component: App', () => {
  it('should render without errors', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogPagination />
        </Router>
      </Provider>,
    );
  });
});
