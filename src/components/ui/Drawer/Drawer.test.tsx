import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Drawer from './Drawer';

describe('Drawer', () => {
  it('renders when open', () => {
    render(
      <Drawer isOpen onClose={() => {}}>
        <Drawer.Header>
          <Drawer.Title>Drawer title</Drawer.Title>
          <Drawer.CloseTrigger />
        </Drawer.Header>
        <Drawer.Body>
          <div>Content</div>
        </Drawer.Body>
      </Drawer>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('closes on ESC key', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <Drawer.Header>
          <Drawer.Title>Drawer title</Drawer.Title>
          <Drawer.CloseTrigger />
        </Drawer.Header>
        <Drawer.Body>
          <div>Content</div>
        </Drawer.Body>
      </Drawer>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('defaults to end placement', () => {
    render(
      <Drawer isOpen onClose={() => {}}>
        <Drawer.Header>
          <Drawer.Title>Drawer title</Drawer.Title>
          <Drawer.CloseTrigger />
        </Drawer.Header>
        <Drawer.Body>
          <div>Content</div>
        </Drawer.Body>
      </Drawer>
    );
    const container = screen.getByTestId('drawer-container');
    expect(container.classList.contains('justify-end')).toBe(true);
  });

  it('closes when clicking on header close button', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <Drawer.Header>
          <Drawer.Title>Drawer title</Drawer.Title>
          <Drawer.CloseTrigger />
        </Drawer.Header>
        <Drawer.Body>
          <div>Content</div>
        </Drawer.Body>
      </Drawer>
    );

    fireEvent.click(screen.getByTestId('drawer-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
