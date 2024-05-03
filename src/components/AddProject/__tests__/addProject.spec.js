import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddProject from '../AddProject';

test('renders AddProject component correctly', () => {
  render(<AddProject />); 
  expect(screen.getByText('+ Add Project')).toBeInTheDocument();
});

test('opens modal when Add Project button is clicked', () => {
  render(<AddProject />);

  expect(screen.queryByText('Project Name:')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('+ Add Project'));
  expect(screen.getByText('Project Name:')).toBeInTheDocument();
});

test('closes modal when cancel button is clicked', () => {
  render(<AddProject onSave={() => {}} />);
  fireEvent.click(screen.getByText('+ Add Project')); 
  fireEvent.click(screen.getByText('Cancel')); 
  expect(screen.queryByText('Project Name:')).not.toBeInTheDocument(); 
});


test('renders form when Add Project button is clicked', () => {
  render(<AddProject />);

  fireEvent.click(screen.getByText('+ Add Project'));

  expect(screen.getByLabelText('Project Name:')).toBeInTheDocument();
  expect(screen.getByLabelText('Status:')).toBeInTheDocument();
  expect(screen.getByLabelText('Initial Date:')).toBeInTheDocument();
  expect(screen.getByLabelText('Finish Date:')).toBeInTheDocument();
  expect(screen.getByLabelText('Technologies:')).toBeInTheDocument();
  expect(screen.getByText('Save')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();
});

test('saves project when form is submitted', () => {
  const mockOnSave = jest.fn();

  render(<AddProject onSave={mockOnSave} />);

  fireEvent.click(screen.getByText('+ Add Project'));

  fireEvent.change(screen.getByLabelText('Project Name:'), { target: { value: 'Test Project' } });
  fireEvent.change(screen.getByLabelText('Status:'), { target: { value: 'To Do' } });
  fireEvent.change(screen.getByLabelText('Initial Date:'), { target: { value: '2024-04-27' } });
  fireEvent.change(screen.getByLabelText('Finish Date:'), { target: { value: '2024-05-05' } });
  fireEvent.change(screen.getByLabelText('Technologies:'), { target: { value: 'React, Node.js' } });

  fireEvent.click(screen.getByText('Save'));

  expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
    projectName: 'Test Project',
    status: 'To Do',
    initialDate: '2024-04-27',
    finishDate: '2024-05-05',
    technologies: 'React, Node.js',
    id: expect.any(String) 
  }));
});

