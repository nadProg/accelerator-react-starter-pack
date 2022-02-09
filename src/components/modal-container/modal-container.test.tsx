import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { asyncDelay } from '../../utils/common';
import ModalContainer from './modal-container';

describe('Component: ModalContainer', () => {
  it('should render without errors in inactive mode', () => {
    const mockOnClose = jest.fn();

    render(
      <ModalContainer onClose={mockOnClose} isActive={false} testId="modal-container">
        <div data-testid="children" />
      </ModalContainer>,
    );

    expect(screen.getByTestId('children')).toBeInTheDocument();
    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('modal-btn-close')).toBeInTheDocument();

    expect(screen.getByTestId('modal-container')).not.toHaveClass('is-active');
  });

  it('should render without errors in active mode', () => {
    const mockOnClose = jest.fn();

    render(
      <ModalContainer onClose={mockOnClose} isActive testId="modal-container">
        <div data-testid="children" />
      </ModalContainer>,
    );

    expect(screen.getByTestId('children')).toBeInTheDocument();
    expect(screen.getByTestId('modal-container')).toBeInTheDocument();

    expect(screen.getByTestId('modal-container')).toHaveClass('is-active');
  });

  it('should handle focus loop', async () => {
    const mockOnClose = jest.fn();

    render(
      <ModalContainer onClose={mockOnClose} isActive testId="modal-container">
        <input data-testid='input' />
        <textarea data-testid='textarea' />
        <input data-testid='button' />
      </ModalContainer>,
    );

    expect(screen.getByTestId('input')).not.toHaveFocus();
    expect(screen.getByTestId('textarea')).not.toHaveFocus();
    expect(screen.getByTestId('button')).not.toHaveFocus();
    expect(screen.getByTestId('modal-btn-close')).not.toHaveFocus();

    await act(async () => await asyncDelay(300));

    expect(screen.getByTestId('input')).toHaveFocus();

    userEvent.tab();

    expect(screen.getByTestId('input')).not.toHaveFocus();
    expect(screen.getByTestId('textarea')).toHaveFocus();
    expect(screen.getByTestId('button')).not.toHaveFocus();
    expect(screen.getByTestId('modal-btn-close')).not.toHaveFocus();

    userEvent.tab();

    expect(screen.getByTestId('input')).not.toHaveFocus();
    expect(screen.getByTestId('textarea')).not.toHaveFocus();
    expect(screen.getByTestId('button')).toHaveFocus();
    expect(screen.getByTestId('modal-btn-close')).not.toHaveFocus();

    userEvent.tab();

    expect(screen.getByTestId('input')).not.toHaveFocus();
    expect(screen.getByTestId('textarea')).not.toHaveFocus();
    expect(screen.getByTestId('button')).not.toHaveFocus();
    expect(screen.getByTestId('modal-btn-close')).toHaveFocus();

    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();

    expect(screen.getByTestId('input')).toHaveFocus();
    expect(screen.getByTestId('textarea')).not.toHaveFocus();
    expect(screen.getByTestId('button')).not.toHaveFocus();
    expect(screen.getByTestId('modal-btn-close')).not.toHaveFocus();
  });
});
