import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';
import { useState } from 'react';

const ButtonWithCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log('Button clicked');
  };

  return <Button onClick={handleClick}>Clicked {count} times</Button>;
};

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('update label on click', async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<ButtonWithCounter />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Clicked 0 times');
    expect(logSpy).not.toHaveBeenCalled();

    await user.click(button);
    expect(button.textContent).toBe('Clicked 1 times');
    expect(logSpy).toHaveBeenCalledWith('Button clicked');
  });
});
