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

  it('calls onClose when ESC key pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <Modal.Body>ESC test</Modal.Body>
      </Modal>
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('renders content inside portal root', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <Modal.Body>Portal</Modal.Body>
      </Modal>
    );
    const modalRoot = document.getElementById('modal-root');
    expect(modalRoot).toBeInTheDocument();
    expect(modalRoot?.querySelector('[data-testid="modal-content"]')).toBeInTheDocument();
  });

  it('applies cover size padding, dimensions, and centered placement', () => {
    render(
      <Modal isOpen onClose={() => {}} size="cover">
        <Modal.Body>Cover</Modal.Body>
      </Modal>
    );
    const container = screen.getByTestId('modal-container');
    const content = screen.getByTestId('modal-content');
    const overlay = screen.getByTestId('modal-overlay');
    expect(container).toHaveClass('pt-0', 'pb-10', 'px-10', 'items-center');
    expect(content).toHaveClass('w-full', 'h-full');
    expect(overlay).toHaveClass('bg-black/50');
  });
});
