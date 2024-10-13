import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../api/auth';
import TUser from '../types/user';

interface TAuthContext {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside of an AuthProvider component.')
  }

  return context;
};

export const AuthProvider : React.FC<{ children : React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        const currentUser = response.data.user;
        setUser(currentUser);
      } catch (error) {
        console.error('Could not retrieve user data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      { children }
    </AuthContext.Provider>
  );
};