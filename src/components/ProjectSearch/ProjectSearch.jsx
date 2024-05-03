import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #FF6767;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4010;
  }
`;

const ProjectSearch = ({ projects, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const filteredProjects = projects.filter(project => project.user === searchTerm);
    onSearch(filteredProjects);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Find projects by user"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton onClick={handleSearch} data-testid="search-button">
        <FiSearch />
      </SearchButton>
    </SearchContainer>
  );
};

export default ProjectSearch;
