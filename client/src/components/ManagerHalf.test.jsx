import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManagerHalf from './ManagerHalf'; 


global.fetch = jest.fn((url) => {
  if (url.includes('/api/service/resetQueues')) {
    return Promise.resolve({
      ok: true,
      json: async () => Promise.resolve('Queues reset successfully!'),
    });
  } else if (url.includes('/api/service/saveCounterServices')) {
    return Promise.resolve({
      ok: true,
      json: async () => Promise.resolve('Counter services saved successfully!'),
    });
  }

  return Promise.reject(new Error('Unknown API'));
});

describe('ManagerHalf Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders Manager Dashboard and buttons', () => {
    render(<ManagerHalf />);


    expect(screen.getByText(/Manager Dashboard/i)).toBeInTheDocument();

    expect(screen.getByText(/Reset Queues/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Configuration/i)).toBeInTheDocument();
  });

  test('button click shows messages', async () => {
    render(<ManagerHalf />);

    const resetButton = screen.getByText(/Reset Queues/i);
    const saveButton = screen.getByText(/Save Configuration/i);

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.getByText(/Queues reset successfully!/i)).toBeInTheDocument();
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Counter services saved successfully!/i)).toBeInTheDocument();
    });
  });
});
