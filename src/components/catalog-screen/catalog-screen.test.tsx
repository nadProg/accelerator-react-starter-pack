import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { State } from '../../types/store';
import CatalogScreen from './catalog-screen';
import { createMockState } from '../../mock/state';

const mockState = createMockState();

const mockIdleState: State = {
  ...mockState,
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

describe('Component: CatalogScreen', () => {
  it('should render without errors', () => {
    const mockStore = configureMockStore<State>()(mockIdleState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogScreen />
        </Router>
      </Provider>,
    );

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
