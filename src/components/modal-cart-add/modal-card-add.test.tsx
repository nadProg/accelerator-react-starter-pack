import {render} from '@testing-library/react';
import { GuitarType } from '../../constants/constants';
import { Guitar } from '../../types/types';
import ModalCartAdd from './modal-cart-add';

const mockOnClose = jest.fn();

const mockProduct: Guitar = {
  id: 0,
  name: '',
  vendorCode: '',
  type: GuitarType.Electric,
  description: '',
  previewImg: '',
  stringCount: 4,
  rating: 3,
  price: 3,
  comments: [],
};

describe('Component: ModalCartAdd', () => {
  it('should render without errors', () => {
    render(
      <ModalCartAdd product={mockProduct} onClose={mockOnClose} />,
    );
  });
});
