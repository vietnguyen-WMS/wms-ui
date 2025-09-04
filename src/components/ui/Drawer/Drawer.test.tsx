import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Drawer from './Drawer';

describe('Drawer', () => {
  it('renders when open', () => {
    render(
      <Drawer isOpen onClose={() => {}}>
        <div>Content</div>
      </Drawer>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('closes on ESC key', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <div>Content</div>
      </Drawer>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('defaults to end placement', () => {
    render(
      <Drawer isOpen onClose={() => {}}>
        <div>Content</div>
      </Drawer>
    );
    const container = screen.getByTestId('drawer-container');
    expect(container.classList.contains('justify-end')).toBe(true);
  });
});
