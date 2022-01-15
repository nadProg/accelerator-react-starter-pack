import {render} from '@testing-library/react';
import { datatype } from 'faker';
import AddReviewForm from './add-review-form';

const mockGuitarId = datatype.number();
const mockOnSuccessSubmitting = jest.fn();

describe('Component: AddReviewForm', () => {
  it('should render without errors', () => {
    render(
      <AddReviewForm guitarId={mockGuitarId} onSuccessSubmitting={mockOnSuccessSubmitting}/>,
    );
  });
});
