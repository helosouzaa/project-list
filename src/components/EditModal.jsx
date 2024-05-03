import React, { useState } from 'react';
import styled from 'styled-components';
import EditProjectForm from './editProjectForm/EditProjectForm';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border: 5px solid #FF6767;
`;

const Button = styled.button`
  background-color: #FF6767;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4010;
  }
`;

const EditModal = ({ onClose, project, onEdit, onRemove }) => {
  const [editing, setEditing] = useState(false); 

  const handleEditClick = () => {
    setEditing(true); 
  };

  const handleRemoveClick = () => {
    onRemove(project);
  };

  const handleSaveEdit = (editedProject) => {
    editedProject.id = project.id; 
    onEdit(editedProject);
    setEditing(false);
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {editing ? ( 
          <EditProjectForm
            project={project}
            onSave={handleSaveEdit}
            onClose={() => setEditing(false)}
          />
        ) : (
          <>
            <h2 style={{ marginBottom: '20px' }}>{project.projectName}</h2>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Initial Date:</strong> {project.initialDate}</p>
            <p><strong>Finish Date:</strong> {project.finishDate}</p>
            <p><strong>Technologies:</strong> {project.technologies}</p>
            <div style={{ marginTop: '20px' }}>
              <Button onClick={handleEditClick}>Edit</Button>
              <Button onClick={handleRemoveClick}>Remove</Button>
              <Button onClick={onClose}>Close</Button>
            </div>
          </>
        )}
      </ModalContent>
    </ModalBackground>
  );
}

export default EditModal;
