import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';

describe('Login component', () => {
  test('renders login form correctly', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Login />);
    
    expect(getByPlaceholderText('User')).toBeInTheDocument();
    expect(getByPlaceholderText('password')).toBeInTheDocument();
    expect(getByTestId('signin-button')).toBeInTheDocument();
    expect(getByText('Or login with')).toBeInTheDocument();
    expect(getByText('Don\'t have an account? Sign Up')).toBeInTheDocument();
  });
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Login component', () => {
  test('submits login form with valid credentials', async () => {
    const onLoginMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(<Login onLogin={onLoginMock} />);
    
    fireEvent.change(getByPlaceholderText('User'), { target: { value: 'user' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'password' } });
    fireEvent.click(getByTestId('signin-button'));

    await waitFor(() => {
      expect(onLoginMock).toHaveBeenCalled();
    });
  });
});

