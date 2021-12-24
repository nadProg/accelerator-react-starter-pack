import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockState } from '../../mock/state';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';
import CatalogFilter from './catalog-filter';
import thunk from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockState = createMockState();
const mockStore = configureMockStore<State>(middlewares)(mockState);

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore}>
        <CatalogFilter />
      </Provider>,
    );
  });
});
