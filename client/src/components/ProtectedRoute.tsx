import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface TProtectedRoute {
  children: React.ReactNode;
}

const ProtectedRoute : React.FC<TProtectedRoute> = ({ children }) => {
  const { user } = useAuth();

  return (
    user ? <>{children}</> : <Navigate to="/login" />
  )
};

export default ProtectedRoute;