import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMockGuitarWithComments } from '../../mock/guitar';
import ProductCard from './product-card';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockProduct = createMockGuitarWithComments();

const mockHistory = createMemoryHistory();

describe('Component: ProductCard', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <ProductCard product={mockProduct} />
      </Router>,
    );
  });

  it('should handle open/close add-to-card modal', () => {
    render(
      <Router history={mockHistory}>
        <ProductCard product={mockProduct} />
      </Router>,
    );

    expect(screen.queryByTestId('modal-cart-add')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-to-cart'));
    expect(screen.getByTestId('modal-cart-add')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-overlay'));
    expect(screen.queryByTestId('modal-cart-add')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-to-cart'));
    expect(screen.getByTestId('modal-cart-add')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-button-close'));
    expect(screen.queryByTestId('modal-cart-add')).not.toBeInTheDocument();
  });
});
