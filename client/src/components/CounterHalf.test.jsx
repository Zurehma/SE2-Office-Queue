import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  test('updates current customer when Next Customer button is clicked', async () => {
    API.getUserInfo.mockResolvedValueOnce({ username: 'manager1' });
    API.getNextTicket.mockResolvedValueOnce({ ticket: 'MT1' });
  
    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);
  
    // Attendi che il pulsante venga visualizzato e cliccato
    const nextCustomerButton = await screen.findByText(/next customer/i);
    fireEvent.click(nextCustomerButton);
  
    // Verifica che setCurrentCustomer sia stato chiamato con il biglietto aggiornato
    expect(mockSetCurrentCustomer).toHaveBeenCalledWith({ ticket: 'MT1' });
  });
  
  test('displays error message if API call fails', async () => {
    API.getUserInfo.mockRejectedValueOnce(new Error('API Error'));
  
    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);
  
    // Verifica che il messaggio di errore sia visualizzato
    const errorText = await screen.findByText(/no customer in service/i);
    expect(errorText).toBeInTheDocument();
  });
  
  test('calls getUserInfo and getNextTicket on component mount', async () => {
    API.getUserInfo.mockResolvedValueOnce({ username: 'manager1' });
    API.getNextTicket.mockResolvedValueOnce({ ticket: 'MT1' });
  
    render(<CounterHalf setCurrentCustomer={mockSetCurrentCustomer} currentCustomer={null} />);
  
    // Verifica che le chiamate API siano state eseguite
    expect(API.getUserInfo).toHaveBeenCalledTimes(1);
  
    await waitFor(() => expect(API.getNextTicket).toHaveBeenCalledTimes(1));
  });
  

  
});





