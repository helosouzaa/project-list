import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditModal from '../../components/EditModal'; 
import AddProject from '../../components/AddProject/AddProject'; 

const DashboardTitle = styled.h1`
  color: #FF6767;
`;

const GridContainer = styled.div`
  padding-top: 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Column = styled.div`
  background-color: #ffffffcf;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #FF6767;
`;

const ProjectInfo = styled.div`
  margin-bottom: 10px;
`;

const ProjectName = styled.p`
  cursor: pointer;
  background-color: ${({ status }) => {
    switch (status) {
      case 'To Do':
        return '#ffadad'; 
      case 'Doing':
        return '#ffd6a5'; 
      case 'Done':
        return '#caffbf';
      default:
        return '#f0f0f0'; 
    }
  }};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  padding-right: 80px;
`;

const ProjectLink = styled.a`
  color: #007bff;
  text-decoration: underline;
  margin-left: 5px;
`;

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(savedProjects);
  }, []);

  const handleSaveProject = (newProject) => {
    const updatedProjects = [...projects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleEditProject = (editedProject) => {
    const updatedProjects = projects.map(project => {
      if (project.id === editedProject.id) {
        return editedProject;
      }
      return project;
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    setSelectedProject(null);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleRemoveProject = (projectToRemove) => {
    const updatedProjects = projects.filter(project => project.id !== projectToRemove.id);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    setSelectedProject(null);
  };

  return (
    <div>
      <DashboardTitle>Dashboard</DashboardTitle>
      <AddProject onSave={handleSaveProject} />
      <GridContainer>
        <Column>
          <h2>To Do</h2>
          {projects.filter(project => project.status === 'To Do').map((project, index) => (
            <ProjectInfo key={index}>
              <ProjectName onClick={() => handleProjectClick(project)} status="To Do">
                {project.projectName}
              </ProjectName>
              {project.githubRepoLink && (
                <ProjectLink href={project.githubRepoLink} target="_blank" rel="noopener noreferrer">
                  (GitHub)
                </ProjectLink>
              )}
            </ProjectInfo>
          ))}
        </Column>
        <Column>
          <h2>Doing</h2>
          {projects.filter(project => project.status === 'Doing').map((project, index) => (
            <ProjectInfo key={index}>
              <ProjectName onClick={() => handleProjectClick(project)} status="Doing">
                {project.projectName}
              </ProjectName>
              {project.githubRepoLink && (
                <ProjectLink href={project.githubRepoLink} target="_blank" rel="noopener noreferrer">
                  (GitHub)
                </ProjectLink>
              )}
            </ProjectInfo>
          ))}
        </Column>
        <Column>
          <h2>Done</h2>
          {projects.filter(project => project.status === 'Done').map((project, index) => (
            <ProjectInfo key={index}>
              <ProjectName onClick={() => handleProjectClick(project)} status="Done">
                {project.projectName}
              </ProjectName>
              {project.githubRepoLink && (
                <ProjectLink href={project.githubRepoLink} target="_blank" rel="noopener noreferrer">
                  (GitHub)
                </ProjectLink>
              )}
            </ProjectInfo>
          ))}
        </Column>
      </GridContainer>
      {selectedProject && (
        <EditModal 
          onClose={handleCloseModal} 
          project={selectedProject} 
          onEdit={handleEditProject} 
          onRemove={handleRemoveProject} 
        />
      )}
    </div>
  );
}

export default Dashboard;
