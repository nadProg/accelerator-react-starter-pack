import {render} from '@testing-library/react';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import ModalCartAdd from './modal-cart-add';

const mockOnClose = jest.fn();

const mockProduct = createMockGuitarWithReviews();

describe('Component: ModalCartAdd', () => {
  it('should render without errors', () => {
    render(
      <ModalCartAdd guitar={mockProduct} onClose={mockOnClose} />,
    );
  });
});
