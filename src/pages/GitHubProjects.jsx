import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FiSearch, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GitHubTitle = styled.h1`
  color: #FF6767;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const UserProjectsContainer = styled.div`
  flex: 1 1 300px; 
  border: 2px solid #FF6767;
  border-radius: 8px;
  padding: 10px;
  position: relative;
`;

const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProjectListItem = styled.li`
  margin-bottom: 10px;
`;

const ProjectLinkContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  height: 50px;
`;

const ProjectLink = styled.a`
  color: #FF6767;
  text-decoration: none;
  margin-left: 10px;
`;

const TrashIcon = styled(FiTrash2)`
  cursor: pointer;
  padding-left: 25px;
`;

const Tooltip = styled.span`
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const TrashButton = styled.span`
  position: relative;
  display: inline-block;
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

const Button = styled.button`
  background-color: #FF6767;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4010;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #FF6767;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4010;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const DeleteUserButton = styled.button`
  background-color: #FF6767;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4010;
  }
`;

const Modal = styled.div`
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
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

const CenteredButton = styled(Button)`
  display: block;
  margin: 0 auto;
  width: 100%
`;

const GitHubProjects = () => {
  const [username, setUsername] = useState('');
  const [projectsByUser, setProjectsByUser] = useState(() => {
    const savedProjects = JSON.parse(localStorage.getItem('githubProjects')) || {};
    return savedProjects;
  });
  const [expandedProjects, setExpandedProjects] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      const fetchedProjects = response.data;
      setProjectsByUser((prevProjects) => ({
        ...prevProjects,
        [username]: fetchedProjects
      }));
      toast.success('Projects added successfully');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('User not found');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProjects();
  };

  const handleDeleteUser = (user) => {
    const updatedProjects = { ...projectsByUser };
    delete updatedProjects[user];
    setProjectsByUser(updatedProjects);
    toast.success(`User "${user}" and projects deleted successfully`);
  };

  const handleDeleteProject = (username, id) => {
    const updatedProjects = projectsByUser[username].filter((project) => project.id !== id);
    setProjectsByUser((prevProjects) => ({
      ...prevProjects,
      [username]: updatedProjects
    }));
  };

  const handleExpandProjects = (username) => {
    setExpandedProjects(username);
  };

  const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: #FF6767;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
`;

  useEffect(() => {
    localStorage.setItem('githubProjects', JSON.stringify(projectsByUser));
  }, [projectsByUser]);

  return (
    <div>
      <GitHubTitle>My Favs GitHub Projects</GitHubTitle>
      <form onSubmit={handleSubmit}>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={handleInputChange}
          />
          <SearchButton type="submit">
            <FiSearch />
          </SearchButton>
        </SearchContainer>
      </form>
      <ToastContainer autoClose={700} />
      <Container>
        {Object.keys(projectsByUser).map((user) => (
          Array.isArray(projectsByUser[user]) && projectsByUser[user].length > 0 && (
            <UserProjectsContainer key={user}>
              <h2>
                {user}'s Projects
                <DeleteUserButton onClick={() => handleDeleteUser(user)}>Delete User</DeleteUserButton>
              </h2>
              <ProjectList>
                {projectsByUser[user].slice(0, 3).map((project) => (
                  <ProjectListItem key={project.id}>
                    <ProjectLinkContainer>
                      <div>
                        <FiExternalLink size={20} />
                        <ProjectLink href={project.html_url} target="_blank" rel="noopener noreferrer">
                          {project.name}
                        </ProjectLink>
                      </div>
                      <TrashButton>
                        <TrashIcon size={20} onClick={() => handleDeleteProject(user, project.id)} />
                        <Tooltip>Delete project</Tooltip>
                      </TrashButton>
                    </ProjectLinkContainer>
                  </ProjectListItem>
                ))}
              </ProjectList>
              {projectsByUser[user].length > 3 && (
                <Button onClick={() => handleExpandProjects(user)}>See All Projects</Button>
              )}
            </UserProjectsContainer>
          )
        ))}
      </Container>
      {expandedProjects && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setExpandedProjects(null)}>×</CloseButton>
            <h2>{expandedProjects}'s Projects</h2>
            <ProjectList>
              {projectsByUser[expandedProjects].map((project) => (
                <ProjectListItem key={project.id}>
                  <ProjectLinkContainer>
                    <div>
                      <FiExternalLink size={20} />
                      <ProjectLink href={project.html_url} target="_blank" rel="noopener noreferrer">
                        {project.name}
                      </ProjectLink>
                    </div>
                    <TrashButton>
                      <TrashIcon size={20} onClick={() => handleDeleteProject(expandedProjects, project.id)} />
                      <Tooltip>Delete project</Tooltip>
                    </TrashButton>
                  </ProjectLinkContainer>
                </ProjectListItem>
              ))}
            </ProjectList>
            <CenteredButton onClick={() => setExpandedProjects(null)}>Close</CenteredButton>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default GitHubProjects;
