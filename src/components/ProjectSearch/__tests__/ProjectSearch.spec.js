import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProjectSearch from '../ProjectSearch';

describe('ProjectSearch component', () => {
  test('renders project search input and button correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<ProjectSearch />);
    
    expect(getByPlaceholderText('Find projects by user')).toBeInTheDocument();
    expect(getByTestId('search-button')).toBeInTheDocument(); 
  });

  test('calls onSearch with correct search term when button is clicked', () => {
    const mockOnSearch = jest.fn();
    const projects = [{ user: 'Test user' }, { user: 'Another user' }]; 
    const { getByPlaceholderText, getByTestId } = render(<ProjectSearch onSearch={mockOnSearch} projects={projects} />);
    
    fireEvent.change(getByPlaceholderText('Find projects by user'), { target: { value: 'Test user' } });

    fireEvent.click(getByTestId('search-button'));

    expect(mockOnSearch).toHaveBeenCalledWith([{ user: 'Test user' }]);
  });
});
