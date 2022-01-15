import {render} from '@testing-library/react';
import AddReviewForm from './add-review-form';

const mockOnSuccessSubmitting = jest.fn();

describe('Component: AddReviewForm', () => {
  it('should render without errors', () => {
    render(
      <AddReviewForm onSuccessSubmitting={mockOnSuccessSubmitting}/>,
    );
  });
});
