import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FiUser, FiLock } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import backgroundImage from '/Users/heloisa.souza/Documents/hotmart/lists-project/src/assets/background.png';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: calc(100% - 20%); 
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: 45%; 
  background-position: right; 
  margin-left: 60px;
  opacity: 0.8;
`;

const LoginForm = styled.form`
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  padding: 40px;
  width: 300px;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  margin-right: 40px; 
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
`;

const InputField = styled.input`
  width: 75%;
  padding: 15px 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #FF6767;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4010;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const SignUpLink = styled.a`
  margin-top: 10px;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'user' && password === 'password') {
        onLogin(username); 
        history.push("/");
      } else {
        setError('User or password are incorrects. Please, try again');
      }
  };

  const redirectToGoogle = () => {
    window.location.href = 'https://www.google.com.br/?hl=pt-BR';
  };

  const redirectToFacebook = () => {
    window.location.href = 'https://www.facebook.com';
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <InputContainer>
          <InputIcon>
            <FiUser size={20} />
          </InputIcon>
          <InputField
            type="text"
            placeholder="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputIcon>
            <FiLock size={20} />
          </InputIcon>
          <InputField
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" data-testid="signin-button">Sign In</Button>
        <span style={{ margin: '10px 0' }}>Or login with</span>
        <div>
          <FaGoogle size={20} style={{ marginRight: '10px', cursor: 'pointer' }} onClick={redirectToGoogle} />
          <FaFacebook size={20} style={{ cursor: 'pointer' }} onClick={redirectToFacebook} />
        </div>
        <SignUpLink href="#">Don't have an account? Sign Up</SignUpLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
