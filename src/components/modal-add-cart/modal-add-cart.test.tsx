import {render} from '@testing-library/react';
import { screen } from '@testing-library/react';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import ModalAddCart from './modal-add-cart';

const mockOnClose = jest.fn();

const mockGuitar = createMockGuitarWithReviews();

describe('Component: ModalAddCart', () => {
  it('should render without errors', () => {
    render(
      <ModalAddCart guitar={mockGuitar} isActive onClose={mockOnClose} />,
    );

    expect(screen.getByTestId('success-button-confirm')).toBeInTheDocument();
    expect(screen.getByTestId('modal-button-close')).toBeInTheDocument();
  });
});
