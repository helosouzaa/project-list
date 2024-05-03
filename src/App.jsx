import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiSettings, FiGithub, FiLogOut, FiMenu } from 'react-icons/fi'; 
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import profilePic from './assets/profile-pic.jpg';
import projectListIcon from './assets/lmp-logo.png';
import GitHubProjects from './pages/GitHubProjects';
import Statistics from './pages/Statistics/Statistics';
import MyProfile from './pages/MyProfile';

const Header = styled.header`
  color: #FF4010;
  padding: 10px 0;
  text-align: center;
  font-size: 28px;
  font-family: 'Inter';
  font-weight: bold;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3); 
  position: relative;
`;

const ProjectListIcon = styled.img`
  height: 70px; 
  width: auto; 
  margin-right: -8px; 
`;

const ProfileButton = styled.button`
  position: absolute;
  top: 35px;
  right: 45px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ProfilePicHeader = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${profilePic});
  background-size: cover;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfilePicSidebar = styled(ProfilePicHeader)`
  width: 80px;
  height: 80px;
  background-image: url(${profilePic});
  background-size: cover;
  border-radius: 50%;
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
`;

const ProfileMenu = styled.ul`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #f0f0f0;
  list-style: none;
  padding: 10px 0;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.li`
  font-size: 13px; 
  padding: 2px 30px;
  cursor: pointer;
  &:hover {
    background-color: #F8F8F8;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const Bar = styled.div`
  height: 50px; 
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.div`
  width: 230px;
  background-color: #FF6767;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: 'Inter', sans-serif;
  position: fixed;
  top: 150px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  padding-top: 40px;
  justify-content: flex-start; 
`;

const Greeting = styled.div`
  margin-top: 60px;
  color: #ffefef;
  text-align: center;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  &:hover {
    background-color: white;
    color: #FF6767;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  color: #FF4010;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 10px;
  font-weight: 600;
  &:hover {
    background-color: #F8F8F8;
  }
`;

const Content = styled.div`
  margin-left: 250px;
  padding: 50px;
  margin-top: 25px;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div>
        <Bar>
          <Header>
            <ProjectListIcon src={projectListIcon} alt="Project List Icon" />
            {isLoggedIn && (
              <ProfileButton onClick={toggleMenu}>
                <ProfilePicHeader />
                <FiMenu size={20} color="#FF4010" /> 
                <ProfileMenu isOpen={isMenuOpen}>
                  <MenuItem>
                    <ProfileLink to="/my-profile"> 
                      <IconWrapper><FiHome size={20} /></IconWrapper>My Profile
                    </ProfileLink>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <IconWrapper><FiLogOut size={20} /></IconWrapper>Logout
                  </MenuItem>
                </ProfileMenu>
              </ProfileButton>
            )}
          </Header>
        </Bar>
        <Container>
          {isLoggedIn ? (
            <>
              <Sidebar>
                <ProfilePicSidebar />
                <Greeting>Hello, {username || 'User'}!</Greeting>
                <SidebarContent>
                  <StyledLink to="/" style={{ marginBottom: '20px' }}>
                    <IconWrapper><FiHome size={20} /></IconWrapper>Dashboard
                  </StyledLink>
                  <StyledLink to="/statistics">
                    <IconWrapper><FiSettings size={20} /></IconWrapper>My Statistics
                  </StyledLink>
                  <StyledLink to="/github-projects">
                    <IconWrapper><FiGithub size={20} /></IconWrapper>Favs Github Projects
                  </StyledLink>
                </SidebarContent>
              </Sidebar>
              <Content>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/statistics" component={Statistics} />
                  <Route path="/github-projects" component={GitHubProjects} />
                  <Route path="/my-profile" component={MyProfile} />
                </Switch>
              </Content>
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Container>
      </div>
    </Router>
  );
};

export default App;
