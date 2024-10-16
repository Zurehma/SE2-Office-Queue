// CustomerHalf.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerHalf from './CustomerHalf';
import '@testing-library/jest-dom'; 

describe('CustomerHalf Component', () => {
  const mockProps = {
    ticket: {
      ticket: '12345',  
      estimatedWaitTime: 10 
    },
    error: null,
    setError: jest.fn(), 
  };

  test('renders ticket number and estimated wait time', () => {
    render(<CustomerHalf {...mockProps} />);

    
    expect(screen.getByText(/Your Ticket: 12345/i)).toBeInTheDocument();

  
    expect(screen.getByText(/Estimated waiting time: 10 minutes/i)).toBeInTheDocument();
  });

  test('displays error message if error prop is set', () => {
    const errorProps = {
      ...mockProps,
      error: 'An error occurred', 
    };

    render(<CustomerHalf {...errorProps} />);

    
    expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
  });

  test('does not render QR code if ticket is N/A', () => {
    const noTicketProps = {
      ...mockProps,
      ticket: {
        ticket: 'N/A',
        estimatedWaitTime: 10,
      },
    };

    render(<CustomerHalf {...noTicketProps} />);

    
    expect(screen.queryByText(/No ticket available to generate QR code/i)).toBeInTheDocument();
  });
});
