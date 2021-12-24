import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { State } from '../../types/store';
import CatalogScreen from './catalog-screen';
import { createMockState } from '../../mock/state';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockState = createMockState();
const mockStore = configureMockStore<State>(middlewares)(mockState);

const mockHistory = createMemoryHistory();

describe('Component: CatalogScreen', () => {
  it('should render without errors', () => {

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogScreen />
        </Router>
      </Provider>,
    );
  });
});
