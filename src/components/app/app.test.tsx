import { render
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './app';
import { FetchStatus } from '../../constants/common';
import { State } from '../../types/store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation() {
    return {
      pathname: '',
    };
  },
}));

const mockState: State = {
  guitars: {
    catalogGuitars: {
      data: null,
      status: FetchStatus.Idle,
    },
    currentGuitar: {
      data: null,
      status: FetchStatus.Idle,
    },
    foundGuitars: {
      data: null,
    },
  },
};

const mockHistory = createMemoryHistory();

const mockStore = configureMockStore<State>()(mockState);

mockStore.dispatch = jest.fn();

describe('Component: App', () => {
  it('should render without errors', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <App />
        </Router>
      </Provider>,
    );
  });
});
