// ManagerHalf.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For additional matchers
import ManagerHalf from './ManagerHalf'; // Adjust the import path as necessary

// Mock the fetch function globally to prevent actual API calls
global.fetch = jest.fn((url) => {
  if (url.includes('/api/service/resetQueues')) {
    return Promise.resolve({
      ok: true,
      json: async () => Promise.resolve('Queues reset successfully!'),
    });
  } else if (url.includes('/api/counter/configuration')) {
    if (url.includes('DELETE')) {
      return Promise.resolve({
        ok: true,
        json: async () => Promise.resolve('Configuration deleted successfully!'),
      });
    }
    return Promise.resolve({
      ok: true,
      json: async () => Promise.resolve('Counter services saved successfully!'),
    });
  }

  return Promise.reject(new Error('Unknown API'));
});

describe('ManagerHalf Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  test('renders Manager Dashboard and buttons', () => {
    render(<ManagerHalf />);

    // Check if the main heading is present
    expect(screen.getByText(/Manager Dashboard/i)).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByText(/Reset Queues/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete Configuration/i)).toBeInTheDocument();
  });

  test('button click shows messages', async () => {
    render(<ManagerHalf />);

    const resetButton = screen.getByText(/Reset Queues/i);
    const saveButton = screen.getByText(/Save Configuration/i);
    const deleteButton = screen.getByText(/Delete Configuration/i);

    // Simulate clicking the Reset Queues button
    fireEvent.click(resetButton);

    // Check if the reset message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Queues reset successfully!/i)).toBeInTheDocument();
    });

    // Simulate clicking the Save Configuration button
    fireEvent.click(saveButton);

    // Check if the save message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Counter services saved successfully!/i)).toBeInTheDocument();
    });

    // Simulate clicking the Delete Configuration button
    fireEvent.click(deleteButton);

    // Check if the delete message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Configuration deleted successfully!/i)).toBeInTheDocument();
    });
  });
});
