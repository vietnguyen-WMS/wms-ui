import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByTestId('modal-content')).toHaveClass('w-full');
    expect(screen.getByTestId('modal-container')).toHaveClass('items-center');
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <Modal.Body>Hidden</Modal.Body>
      </Modal>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <Modal.Body>Overlay test</Modal.Body>
      </Modal>
    );
    const container = screen.getByTestId('modal-container');
    await user.click(container);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close when disableClickBackdrop is true', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} disableClickBackdrop>
        <Modal.Body>Overlay disabled</Modal.Body>
      </Modal>
    );
    const container = screen.getByTestId('modal-container');
    await user.click(container);
    expect(onClose).not.toHaveBeenCalled();
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

  it('calls onClose when close icon clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <Modal.Body>Close icon</Modal.Body>
      </Modal>
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders a touch-friendly close button', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <Modal.Body>Close button size</Modal.Body>
      </Modal>
    );
    const closeButton = screen.getByTestId('modal-close');
    expect(closeButton).toHaveClass(
      'w-9',
      'h-9',
      'top-2',
      'right-2',
      'rounded-md'
    );
  });

  it('places footer at bottom with actions aligned right', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>Body</Modal.Body>
        <Modal.Footer>
          <button type="button">Action</button>
        </Modal.Footer>
      </Modal>
    );
    const body = screen.getByText('Body');
    const footer = screen.getByText('Action').parentElement;
    expect(body).toHaveClass('flex-1');
    expect(footer).toHaveClass('mt-auto', 'flex', 'justify-end');
  });

  it('renders content inside portal root', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <Modal.Body>Portal</Modal.Body>
      </Modal>
    );
    const modalRoot = document.getElementById('modal-root');
    expect(modalRoot).toBeInTheDocument();
    expect(
      modalRoot?.querySelector('[data-testid="modal-content"]')
    ).toBeInTheDocument();
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
    expect(container).toHaveClass('p-10', 'items-center');
    expect(content).toHaveClass('w-full', 'h-full');
    expect(overlay).toHaveClass('bg-black/50');
  });

  it('applies full size without padding', () => {
    render(
      <Modal isOpen onClose={() => {}} size="full">
        <Modal.Body>Full</Modal.Body>
      </Modal>
    );
    const container = screen.getByTestId('modal-container');
    const content = screen.getByTestId('modal-content');
    expect(container).toHaveClass('p-0');
    expect(content).toHaveClass('w-full', 'h-full');
  });

  it('unmounts after close animation ends', () => {
    const { rerender } = render(
      <Modal isOpen onClose={() => {}}>
        <Modal.Body>Animated close</Modal.Body>
      </Modal>
    );

    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        <Modal.Body>Animated close</Modal.Body>
      </Modal>
    );

    const content = screen.getByTestId('modal-content');
    expect(content).toBeInTheDocument();

    fireEvent.animationEnd(content);

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });
});
