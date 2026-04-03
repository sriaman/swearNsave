import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Sweat & Save app', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Sweat & Save/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Fitness/i)).toBeInTheDocument();
  expect(screen.getByText(/Finance/i)).toBeInTheDocument();
  expect(screen.getByText(/Wellness/i)).toBeInTheDocument();
  expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});