import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this line
import CustomerHalf from './CustomerHalf'; // Adjust the import path as necessary

describe('CustomerHalf Component', () => {
  test('renders ticket number and estimated wait time', () => {
    const ticketInfo = {
      ticket: '12345',
      estimatedWaitTime: 10,
    };

    render(<CustomerHalf ticket={ticketInfo} error={null} setError={() => {}} />);

    expect(screen.getByText(/your ticket/i)).toBeInTheDocument();
    expect(screen.getByText(/12345/i)).toBeInTheDocument();
    expect(screen.getByText(/estimated waiting time: 10 minutes/i)).toBeInTheDocument();
  });

  test('displays "No ticket available" when no ticket is provided', () => {
    const ticketInfo = {
      ticket: null,
      estimatedWaitTime: 10,
    };

    render(<CustomerHalf ticket={ticketInfo} error={null} setError={() => {}} />);

    expect(screen.getByText(/no ticket available to generate qr code/i)).toBeInTheDocument();
  });

  test('shows an error message when there is an error', () => {
    const errorMessage = "An error occurred!";
    
    render(<CustomerHalf ticket={{ ticket: null, estimatedWaitTime: 10 }} error={errorMessage} setError={() => {}} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('changes color of estimated wait time based on value', () => {
    const ticketInfo = {
      ticket: '12345',
      estimatedWaitTime: 20,
    };

    render(<CustomerHalf ticket={ticketInfo} error={null} setError={() => {}} />);

    const waitTimeElement = screen.getByText(/estimated waiting time: 20 minutes/i);
    expect(waitTimeElement).toHaveClass('text-danger'); // Assuming you are using Bootstrap or a similar CSS framework
  });

  test('renders QR code when a ticket is available', () => {
    const ticketInfo = {
      ticket: '12345',
      estimatedWaitTime: 10,
    };

    render(<CustomerHalf ticket={ticketInfo} error={null} setError={() => {}} />);

    expect(screen.getByRole('img')).toBeInTheDocument(); // Check if the QRCode is rendered
  });
});
