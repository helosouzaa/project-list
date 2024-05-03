import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #FF6767;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const EditProjectForm = ({ project, onSave, onClose }) => {
  const [editedProject, setEditedProject] = useState(project);

  useEffect(() => {
    setEditedProject(project);
  }, [project]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editedProject);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject({ ...editedProject, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="projectName">Project Name:</Label>
        <Input 
          type="text" 
          id="projectName" 
          name="projectName"
          placeholder='Project Name'
          data-testid="projectName-input" 
          value={editedProject.projectName} 
          onChange={handleInputChange} 
          required 
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="status">Status:</Label>
        <Select 
          id="status" 
          name="status"
          data-testid="status-input" 
          value={editedProject.status} 
          onChange={handleInputChange} 
          required 
        >
          <option value=""></option>
          <option value="To Do">To Do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="initialDate">Initial Date:</Label>
        <Input 
          type="date" 
          id="initialDate" 
          name="initialDate"
          data-testid="initialDate-input" 
          value={editedProject.initialDate} 
          onChange={handleInputChange} 
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="finishDate">Finish Date:</Label>
        <Input 
          type="date" 
          id="finishDate" 
          name="finishDate"
          data-testid="finishDate-input" 
          value={editedProject.finishDate} 
          onChange={handleInputChange} 
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="technologies">Technologies:</Label>
        <TextArea 
          id="technologies" 
          name="technologies"
          data-testid="technologies-input" 
          rows="3" 
          value={editedProject.technologies} 
          onChange={handleInputChange} 
          required 
        />
      </FormGroup>
      <ButtonGroup>
        <Button type="submit" data-testid="save-button">Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </ButtonGroup>
    </Form>
  );
}

export default EditProjectForm;
