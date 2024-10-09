import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerHalf from '../components/CustomerHalf'; 
import '@testing-library/jest-dom/extend-expect';

describe('CustomerHalf Component', () => {
  test('renders the QR code', () => {
    render(<CustomerHalf />);
    const qrCode = screen.getByRole('img');
    expect(qrCode).toBeInTheDocument();
  });

  test('displays the correct ticket number', () => {
    render(<CustomerHalf />);
    const ticketNumberText = screen.getByText(/Your Ticket: A124/i);
    expect(ticketNumberText).toBeInTheDocument();
  });
});
