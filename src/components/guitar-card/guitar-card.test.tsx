import {render, within} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import GuitarCard from './guitar-card';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockProduct = createMockGuitarWithReviews();

const mockHistory = createMemoryHistory();

describe('Component: ProductCard', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <GuitarCard guitar={mockProduct} />
      </Router>,
    );
  });

  it('should handle open/close add-to-card modal', () => {
    render(
      <Router history={mockHistory}>
        <GuitarCard guitar={mockProduct} />
      </Router>,
    );

    const modal = screen.getByTestId('modal-cart-add');

    expect(modal).not.toHaveClass('is-active');

    userEvent.click(screen.getByTestId('button-add-to-cart'));
    expect(modal).toHaveClass('is-active');

    userEvent.click(within(modal).getByTestId('modal-overlay'));
    expect(modal).not.toHaveClass('is-active');
  });
});
