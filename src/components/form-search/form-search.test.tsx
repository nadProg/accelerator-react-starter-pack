import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { State } from '../../types/store';
import FormSearch from './form-search';

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

describe('Component: FooterInfo', () => {
  it('should render without errors', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );
  });
});
