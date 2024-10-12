import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute : React.FC<{ element : React.ReactNode }> = ({ element }) => {
  const { user } = useAuth();

  return (
    user ? <>{element}</> : <Navigate to="/login" />
  )
};

export default ProtectedRoute;