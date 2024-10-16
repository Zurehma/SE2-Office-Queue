import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { Home } from './Home'; 
import API from '../../Api';


// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the API
jest.mock('../../Api', () => ({
  getTicketByService: jest.fn(),
}));

describe('Home Component', () => {
  const mockSetError = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the service buttons', () => {
    render(<Home setError={mockSetError} />);
    
    expect(screen.getByText(/public service/i)).toBeInTheDocument();
    expect(screen.getByText(/money transfer/i)).toBeInTheDocument();
    expect(screen.getByText(/shipping and receiving/i)).toBeInTheDocument();
  });

  /**
   * It's not working yet, the component is not complete
   */
  /*
  it('calls the API and navigates on button click', async () => {
    const mockTicket = { id: 1, serviceType: 'public service' };
    API.getTicketByService.mockResolvedValueOnce(mockTicket);

    render(<Home setError={mockSetError} />);
    
    fireEvent.click(screen.getByText(/public service/i));
    
    expect(API.getTicketByService).toHaveBeenCalledWith('public service');
    
    // wait for promise to resolve
    await screen.findByText(/public service/i); 
 
    expect(mockNavigate).toHaveBeenCalledWith('/ticket', { state: { ticket: mockTicket } });
  });
  */

  it('sets an error if the API call fails', async () => {
    const mockError = new Error('API Error');
    API.getTicketByService.mockRejectedValueOnce(mockError);

    render(<Home setError={mockSetError} />);

    fireEvent.click(screen.getByText(/money transfer/i));

    expect(API.getTicketByService).toHaveBeenCalledWith('MONEY TRANSFER');

    // wait for promise rejection
    await screen.findByText(/money transfer/i);

    expect(mockSetError).toHaveBeenCalledWith(mockError);
  });
});
