import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerHalf from './CustomerHalf'; // Adjust the path as necessary
import '@testing-library/jest-dom';

// Mocking the QRCode component from 'react-qr-code'
jest.mock('react-qr-code', () => () => <div data-testid="qr-code">Mock QR Code</div>);

describe('CustomerHalf Component', () => {
  test('renders ticket information and estimated time', () => { 
    render(<CustomerHalf ticket="15" estimatedTime={30} />);

    // Check if the ticket and estimated waiting time are displayed
    expect(screen.getByText(/Your Ticket: 15/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated waiting time: 30 minutes/i)).toBeInTheDocument();
  });

  test('renders QR code if ticket number is present', () => {
    render(<CustomerHalf ticket="15" estimatedTime={30} />);

    // Check if the QR code is rendered using the mocked QR code
    expect(screen.getByTestId('qr-code')).toBeInTheDocument();
  });

  test('displays error message when no ticket is provided', () => {
    render(<CustomerHalf ticket={null} estimatedTime={null} />);

    // Check if the error message is displayed
    expect(screen.getByText(/No ticket available to generate QR code./i)).toBeInTheDocument();
  });

  test('applies red text when waiting time is over 15 minutes', () => {
    render(<CustomerHalf ticket="15" estimatedTime={20} />);

    // Check if the waiting time text is red
    const waitingTime = screen.getByText(/Estimated waiting time: 20 minutes/i);
    expect(waitingTime).toHaveClass('text-danger'); // Assumes red text is applied with 'text-danger' class
  });
});
