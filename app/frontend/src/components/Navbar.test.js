import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

test('renders navbar with logo', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const logo = screen.getByAltText(/Sweat & Save/i) || screen.getByText(/Sweat & Save/i);
  expect(logo).toBeInTheDocument();
});

test('renders navigation links in navbar', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Fitness/i)).toBeInTheDocument();
  expect(screen.getByText(/Finance/i)).toBeInTheDocument();
  expect(screen.getByText(/Wellness/i)).toBeInTheDocument();
  expect(screen.getByText(/Blog/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});