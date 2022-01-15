import {render} from '@testing-library/react';
import { lorem } from 'faker';
import ModalReviewForm from './modal-review-form';

const mockTitle = lorem.words();
const mockOnClose = jest.fn();

describe('Component: ModalReviewForm', () => {
  it('should render without errors', () => {
    render(
      <ModalReviewForm title={mockTitle} onClose={mockOnClose} />,
    );
  });
});
