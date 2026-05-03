import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthProvider';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { setDoc, getDoc } from 'firebase/firestore';

// Mock Firebase
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  GoogleAuthProvider: jest.fn()
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn().mockReturnValue({ id: 'mock-doc' }),
  setDoc: jest.fn(),
  getDoc: jest.fn()
}));

jest.mock('@/lib/firebase', () => ({
  auth: {},
  db: {}
}));

const TestComponent = () => {
  const { user, signInWithGoogle } = useAuth();
  return (
    <div>
      <span data-testid="user">{user?.displayName || 'No User'}</span>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
};

describe('AuthProvider', () => {
  const mockUser = {
    uid: '123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'http://example.com/photo.jpg'
  };

  it('syncs user profile to Firestore after login', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });
    (setDoc as jest.Mock).mockResolvedValue({});

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(setDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        uid: '123',
        displayName: 'Test User'
      })
    );
  });
});
