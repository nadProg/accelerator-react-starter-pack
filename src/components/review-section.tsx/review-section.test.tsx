import {render} from '@testing-library/react';
import { datatype } from 'faker';
import { createMockComment } from '../../mock/comment';
import { createArrayOfObjects } from '../../utils/common';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ReviewSection from './review-section';


const mockReviews = createArrayOfObjects(createMockComment, datatype.number());

describe('Component: ReviewSection', () => {
  it('should render without errors', () => {
    render(
      <ReviewSection reviews={mockReviews} />,
    );
  });

  it('should handle open/close review-form modal', () => {
    render(
      <ReviewSection reviews={mockReviews} />,
    );

    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-review'));
    expect(screen.getByTestId('modal-review-form')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-overlay'));
    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-review'));
    expect(screen.getByTestId('modal-review-form')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-button-close'));
    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();
  });

  it('should handle success modal open after success new review submit', () => {
    render(
      <ReviewSection reviews={mockReviews} />,
    );

    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-success-review')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-review'));
    expect(screen.getByTestId('modal-review-form')).toBeInTheDocument();
    expect(screen.queryByTestId('modal-success-review')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('submit-new-review'));
    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();
    expect(screen.getByTestId('modal-success-review')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-button-close'));
    expect(screen.queryByTestId('modal-success-review')).not.toBeInTheDocument();
  });
});
