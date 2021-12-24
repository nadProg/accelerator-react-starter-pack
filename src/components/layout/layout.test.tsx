import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import Layout from './layout';

const mockState: State = createMockState();

const mockHistory = createMemoryHistory();

const mockStore = configureMockStore<State>()(mockState);

mockStore.dispatch = jest.fn();

describe('Component: MainNavigation', () => {
  it('should render without errors', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Layout />
        </Router>
      </Provider>,
    );
  });
});
