import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard component', () => {
  test('renders dashboard correctly', () => {
    const { getByText } = render(<Dashboard />);
  
    expect(getByText('Dashboard')).toBeInTheDocument();
    });
});