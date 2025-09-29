import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header title', () => {
  render(<App />);
  const title = screen.getByText(/Candy Pop Todos/i);
  expect(title).toBeInTheDocument();
});
