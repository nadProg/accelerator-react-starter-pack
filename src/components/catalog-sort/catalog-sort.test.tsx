import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import CatalogSort from './catalog-sort';

const mockState = createMockState();

const mockStore = configureMockStore<State>()(mockState);

mockStore.dispatch = jest.fn();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore}>
        <CatalogSort />
      </Provider>,
    );

    expect(screen.queryByTestId(/children/i)).not.toBeInTheDocument();
  });
});
