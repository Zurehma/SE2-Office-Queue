import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerHalf from '../components/CustomerHalf';
import '@testing-library/jest-dom/'

global.fetch = jest.fn(); 

describe('CustomerHalf Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders loading state', () => {
    fetch.mockImplementationOnce(() => 
      new Promise(() => {}) 
    );

    render(<CustomerHalf />);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders ticket information on successful fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ticketNumber: '12345',
        estimatedTime: 10,
      }),
    });

    render(<CustomerHalf />);
    
    await waitFor(() => {
      expect(screen.getByText(/Your Ticket: 12345/i)).toBeInTheDocument();
      expect(screen.getByText(/Estimated waiting time: 10 minutes/i)).toBeInTheDocument();
    });
  });

  test('renders error message on fetch failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<CustomerHalf />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch ticket data/i)).toBeInTheDocument();
    });
  });

  test('renders estimated waiting time in red if more than 15 minutes', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ticketNumber: '12345',
        estimatedTime: 20,
      }),
    });

    render(<CustomerHalf />);
    
    await waitFor(() => {
      const waitingTime = screen.getByText(/Estimated waiting time: 20 minutes/i);
      expect(waitingTime).toBeInTheDocument();
      expect(waitingTime).toHaveClass('text-danger'); 
    });
  });

  test('renders estimated waiting time in white if 15 minutes or less', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ticketNumber: '12345',
        estimatedTime: 10,
      }),
    });

    render(<CustomerHalf />);
    
    
    await waitFor(() => {
      const waitingTime = screen.getByText(/Estimated waiting time: 10 minutes/i);
      expect(waitingTime).toBeInTheDocument();
      expect(waitingTime).toHaveClass('text-white'); 
    });
  });
});
