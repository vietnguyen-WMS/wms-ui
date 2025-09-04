import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Accordion from './Accordion';

describe('Accordion', () => {
  it('toggles content and rotates icon', () => {
    render(
      <Accordion title="Title">
        <div>Content</div>
      </Accordion>
    );
    const button = screen.getByRole('button', { name: 'Title' });
    const icon = screen.getByTestId('accordion-icon');
    expect(icon.classList.contains('rotate-180')).toBe(false);
    fireEvent.click(button);
    expect(icon.classList.contains('rotate-180')).toBe(true);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
