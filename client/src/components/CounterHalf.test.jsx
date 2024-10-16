import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CounterHalf from './CounterHalf'; // Assicurati di avere il percorso corretto del componente
import API from '../../Api'; 

// Mock the API calls
jest.mock('../../Api', () => ({
  getUserInfo: jest.fn(),
  getNextTicket: jest.fn(),
}));

describe('CounterHalf Component', () => {
  const mockSetCurrentCustomer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Ripulisce i mock prima di ogni test
  });

  test('displays loading state initially', () => {
    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('fetches and displays ticket information for manager1', async () => {
    API.getUserInfo.mockResolvedValueOnce({ username: 'manager1' });
    API.getNextTicket.mockResolvedValueOnce({ ticket: '15' });

    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);

    // Attendi che l'informazione del biglietto venga visualizzata
    const ticketText = await screen.findByText(/ticket in service: 15/i);
    expect(ticketText).toBeInTheDocument();
  });

  test('fetches and displays ticket information for manager2', async () => {
    API.getUserInfo.mockResolvedValueOnce({ username: 'manager2' });
    API.getNextTicket.mockResolvedValueOnce({ ticket: '20' });

    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);

    const ticketText = await screen.findByText(/ticket in service: 20/i);
    expect(ticketText).toBeInTheDocument();
  });

  test('displays "No customer in service" when no ticket is available', async () => {
    API.getUserInfo.mockResolvedValueOnce({ username: 'manager1' });
    API.getNextTicket.mockResolvedValueOnce(null);

    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);

    const noCustomerText = await screen.findByText(/no customer in service/i);
    expect(noCustomerText).toBeInTheDocument();
  });

  test('handles API error and displays no customer', async () => {
    API.getUserInfo.mockResolvedValueOnce({ username: 'manager1' });
    API.getNextTicket.mockRejectedValueOnce(new Error('API error'));

    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);

    const noCustomerText = await screen.findByText(/no customer in service/i);
    expect(noCustomerText).toBeInTheDocument();
  });

  test('calls handleNextCustomer on button click and updates ticket', async () => {
    API.getUserInfo.mockResolvedValueOnce({ username: 'manager1' });
    API.getNextTicket.mockResolvedValueOnce({ ticket: '15' });

    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);

    // Simula il click sul pulsante "Next Customer"
    fireEvent.click(screen.getByText(/next customer/i));

    // Verifica che il setCurrentCustomer sia stato chiamato con il nuovo ticket
    const ticketText = await screen.findByText(/ticket in service: 15/i);
    expect(ticketText).toBeInTheDocument();
    expect(mockSetCurrentCustomer).toHaveBeenCalledWith('15');
  });
});
