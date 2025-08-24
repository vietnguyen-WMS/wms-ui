import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import { ToastContainer } from '@components/ui/Toast';

describe('Home', () => {
  it('queues incremental toast messages for each click', async () => {
    const { default: Home } = await import('./Home');
    render(
      <>
        <ToastContainer />
        <Home />
      </>
    );
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /show toast/i });

    await user.click(button);
    await screen.findByText('Welcome home 1');

    await user.click(button);
    await screen.findByText('Welcome home 2');

    await user.click(button);
    expect(await screen.findByText('Welcome home 3')).toBeInTheDocument();

    expect(screen.getByText('Welcome home 1')).toBeInTheDocument();
    expect(screen.getByText('Welcome home 2')).toBeInTheDocument();
  });
});
