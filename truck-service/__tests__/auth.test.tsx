import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthScreen from '../app/auth';
import { useAuth } from '../context/auth-context';
import { Alert } from 'react-native';

// Mock expo-router
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

// Mock the useAuth hook
jest.mock('../context/auth-context', () => ({
  useAuth: jest.fn(),
}));

// Mock Alert.alert
jest.spyOn(Alert, 'alert');

describe('AuthScreen - User Registration', () => {
  const mockSignup = jest.fn();

  beforeEach(() => {
    mockSignup.mockClear();
    mockReplace.mockClear();
    (useAuth as jest.Mock).mockClear();
    (Alert.alert as jest.Mock).mockClear();

    // Default mock for useAuth to simulate initial state
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
      login: jest.fn(),
      signup: mockSignup,
      logout: jest.fn(),
    });
  });

  it('successfully registers a new user', async () => {
    // Simulate switching to register mode
    const { getByText, getByPlaceholderText, getByRole } = render(<AuthScreen />);
    fireEvent.press(getByText('Need an account? Register'));

    const registerSubmitButton = getByRole('button', { name: 'Register' });

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(registerSubmitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Account created! You can now log in.');
      // After successful registration, it should switch back to login mode
      expect(getByRole('button', { name: 'Login' })).toBeTruthy();
    });
  });

  it('displays an error for invalid email format during registration', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<AuthScreen />);
    fireEvent.press(getByText('Need an account? Register'));

    // Simulate Firebase error for invalid email
    mockSignup.mockRejectedValueOnce({ code: 'auth/invalid-email', message: 'The email address is badly formatted.' });

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('invalid-email', 'password123');
      expect(Alert.alert).toHaveBeenCalledWith('Authentication Error', 'The email address is badly formatted.');
    });
  });

  it('displays an error for weak passwords during registration', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<AuthScreen />);
    fireEvent.press(getByText('Need an account? Register'));

    // Simulate Firebase error for weak password
    mockSignup.mockRejectedValueOnce({ code: 'auth/weak-password', message: 'Password should be at least 6 characters.' });

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123'); // Weak password
    fireEvent.press(getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('test@example.com', '123');
      expect(Alert.alert).toHaveBeenCalledWith('Authentication Error', 'Password should be at least 6 characters.');
    });
  });

  it('displays an error if the email is already in use during registration', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<AuthScreen />);
    fireEvent.press(getByText('Need an account? Register'));

    // Simulate Firebase error for email already in use
    mockSignup.mockRejectedValueOnce({ code: 'auth/email-already-in-use', message: 'The email address is already in use by another account.' });

    fireEvent.changeText(getByPlaceholderText('Email'), 'existing@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('existing@example.com', 'password123');
      expect(Alert.alert).toHaveBeenCalledWith('Authentication Error', 'The email address is already in use by another account.');
    });
  });
});