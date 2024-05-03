import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import EditProjectForm from '../EditProjectForm';

describe('EditProjectForm', () => {
  it('calls onSave and onClose when form is submitted with valid data', () => {
    const project = {
      projectName: 'Test Project',
      status: 'To Do',
      initialDate: '2024-04-27',
      finishDate: '2024-05-05',
      technologies: 'React, Node.js',
    };

    const onSave = jest.fn();
    const onClose = jest.fn();

    const { getByTestId } = render(
      <EditProjectForm project={project} onSave={onSave} onClose={onClose} />
    );
    
    fireEvent.change(getByTestId('projectName-input'), { target: { value: 'Updated Project' } });
    
    fireEvent.change(getByTestId('status-input'), { target: { value: 'Doing' } });
    fireEvent.submit(getByTestId('save-button'));

    expect(onSave).toHaveBeenCalledWith({
      projectName: 'Updated Project',
      status: 'Doing',
      initialDate: '2024-04-27',
      finishDate: '2024-05-05',
      technologies: 'React, Node.js',
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});


describe('EditProjectForm', () => {
  const project = {
    projectName: 'Test Project',
    status: 'To Do',
    initialDate: '2024-04-27',
    finishDate: '2024-05-05',
    technologies: 'React, Node.js',
  };

  test('initial form state matches project prop', () => {
    const { getByTestId } = render(<EditProjectForm project={project} onSave={() => {}} onClose={() => {}} />);
    
    expect(getByTestId('projectName-input')).toHaveValue(project.projectName);
    expect(getByTestId('status-input')).toHaveValue(project.status);
    expect(getByTestId('initialDate-input')).toHaveValue(project.initialDate);
    expect(getByTestId('finishDate-input')).toHaveValue(project.finishDate);
    expect(getByTestId('technologies-input')).toHaveValue(project.technologies);
  });
});