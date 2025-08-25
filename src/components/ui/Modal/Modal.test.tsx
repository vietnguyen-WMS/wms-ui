import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Modal from './Modal';

describe('Modal', () => {
  it('renders content when open', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <Modal.Body>Hidden</Modal.Body>
      </Modal>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onClose when overlay clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <Modal.Body>Overlay test</Modal.Body>
      </Modal>
    );
    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('applies cover size padding and dimensions', () => {
    render(
      <Modal isOpen onClose={() => {}} size="cover">
        <Modal.Body>Cover</Modal.Body>
      </Modal>
    );
    const container = screen.getByTestId('modal-container');
    const content = screen.getByTestId('modal-content');
    expect(container).toHaveClass('p-8');
    expect(content).toHaveClass('w-full', 'h-full');
  });
});
