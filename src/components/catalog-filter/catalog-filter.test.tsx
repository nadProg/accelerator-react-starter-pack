import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import CatalogFilter from './catalog-filter';

const mockState = createMockState();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore<State>()(mockState);

    render(
      <Provider store={mockStore}>
        <CatalogFilter />
      </Provider>,
    );
  });
});
