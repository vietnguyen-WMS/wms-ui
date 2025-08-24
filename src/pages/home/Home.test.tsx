import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

vi.mock(
  'react-i18next',
  () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }),
  { virtual: true }
);

describe('Home', () => {
  it('shows toast when button is clicked', async () => {
    const { default: Home } = await import('./Home');
    render(<Home />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /show toast/i }));
    expect(await screen.findByText('Welcome home!')).toBeInTheDocument();
  });
});
