import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import { ToastContainer } from '@components/ui/Toast';

describe('Home', () => {
  it('shows toast when button is clicked', async () => {
    const { default: Home } = await import('./Home');
    render(
      <>
        <ToastContainer />
        <Home />
      </>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /show toast/i }));
    expect(await screen.findByText('Welcome home!')).toBeInTheDocument();
  });
});
