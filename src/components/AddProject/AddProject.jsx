import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #FF6767;
  color: white;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 35%;
  margin: auto;
`;

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
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  border: 5px solid #FF6767;
`;

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column; 
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px; 
  max-width: 100%; 
  margin: 0 auto;
  display: block;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 94%;
  max-width: 300px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: center;
`;

const AddProject = ({ onSave, showAddButton = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState(null);
  const [initialDate, setInitialDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [githubRepoLink, setGithubRepoLink] = useState('');

  const openModal = () => {
    setShowModal(true);
    setProjectName('');
    setStatus('');
    setInitialDate('');
    setFinishDate('');
    setTechnologies('');
    setGithubRepoLink('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = Date.now().toString();
    const project = {
      id,
      projectName,
      status,
      initialDate,
      finishDate,
      technologies,
      githubRepoLink
    };
    onSave(project);
    closeModal();
  };

  return (
    <div>
      {showAddButton && (
        <Button onClick={openModal}> + Add Project</Button>
      )}
      {showModal && (
        <ModalBackground>
          <ModalContent>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="projectName">Project Name:</Label>
                <Input
                  type="text"
                  id="projectName"
                  placeholder='Project Name'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="status">Status:</Label>
                <Select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
                  value={initialDate}
                  onChange={(e) => setInitialDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="finishDate">Finish Date:</Label>
                <Input
                  type="date"
                  id="finishDate"
                  value={finishDate}
                  onChange={(e) => setFinishDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="technologies">Technologies:</Label>
                <TextArea
                  id="technologies"
                  rows="3"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="githubRepoLink">Link para o Repositório do GitHub:</Label>
                <Input
                  type="text"
                  id="githubRepoLink"
                  value={githubRepoLink}
                  onChange={(e) => setGithubRepoLink(e.target.value)}
                />
              </FormGroup>
              <ButtonGroup>
                <Button type="submit">Save</Button>
                <Button onClick={closeModal}>Cancel</Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </ModalBackground>
      )}
    </div>
  );
}

export default AddProject;