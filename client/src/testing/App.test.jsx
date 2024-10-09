// src/testing/App.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App'; 

describe('App Component', () => {
  test('renders without crashing', () => {
    const { getByAltText } = render(<App />);

    const backgroundImage = getByAltText('Background Image');
    expect(backgroundImage).toBeInTheDocument();
  });
});
