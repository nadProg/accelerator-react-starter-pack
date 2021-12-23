import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { State } from '../../types/store';
import CardPage from './card-page';

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

const mockId = 5;

describe('Component: CardPage', () => {
  beforeEach(() => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams() {
        return {
          id: mockId,
        };
      },
    }));
  });

  it('should render without errors', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CardPage />
        </Router>
      </Provider>,
    );
  });
});
