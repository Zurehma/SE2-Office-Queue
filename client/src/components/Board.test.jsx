import React from 'react';
import { render, screen } from '@testing-library/react';
import Board from './Board'; // Assicurati di avere il percorso corretto del componente
import '@testing-library/jest-dom';

// Mocking the API call to getUserInfo
jest.mock('../../Api.js', () => ({
  getUserInfo: jest.fn(),
}));

describe('Board Component', () => {
  test('displays the correct counter information for manager1', async () => {
    const API = require('../../Api.js');
    API.getUserInfo.mockResolvedValue({ username: 'manager1' });

    render(<Board currentCustomer={null} />);

    const counterText = await screen.findByText(/COUNTER 2/i); 
    expect(counterText).toBeInTheDocument();
  });

  test('displays the correct counter information for manager2', async () => {
    const API = require('../../Api.js');
    API.getUserInfo.mockResolvedValue({ username: 'manager2' });

    render(<Board currentCustomer={null} />);

    const counterText = await screen.findByText(/COUNTER 3/i);
    expect(counterText).toBeInTheDocument();
  });

  test('displays "NOT SELECTED" when there is an API error', async () => {
    const API = require('../../Api.js');
    API.getUserInfo.mockRejectedValue(new Error('API error'));

    render(<Board currentCustomer={null} />);

    const counterText = await screen.findByText(/COUNTER NOT SELECTED/i);
    expect(counterText).toBeInTheDocument();
  });

  test('displays last ticket called', () => {
    const currentCustomer = { ticket: '42' };

    render(<Board currentCustomer={currentCustomer} />);

    expect(screen.getByText(/Ticket Number: 42/i)).toBeInTheDocument();
  });

  test('displays "No ticket called yet" when no currentCustomer is passed', () => {
    render(<Board currentCustomer={null} />);

    expect(screen.getByText(/No ticket called yet/i)).toBeInTheDocument();
  });
});
