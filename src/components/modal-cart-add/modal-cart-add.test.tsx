import {render} from '@testing-library/react';
import { datatype } from 'faker';
import { createMockGuitarWithComments } from '../../mock/guitar';
import ModalCartAdd from './modal-cart-add';

const mockOnClose = jest.fn();

const mockProduct = createMockGuitarWithComments(datatype.number());

describe('Component: ModalCartAdd', () => {
  it('should render without errors', () => {
    render(
      <ModalCartAdd product={mockProduct} onClose={mockOnClose} />,
    );
  });
});
