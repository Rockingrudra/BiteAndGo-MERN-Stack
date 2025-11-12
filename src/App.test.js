import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GoFood brand', () => {
  render(<App />);
  const linkElement = screen.getByText(/GoFood/i);
  expect(linkElement).toBeInTheDocument();
});
