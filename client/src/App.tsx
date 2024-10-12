import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LogIn from './pages/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import Recipes from './pages/Recipes';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Recipes />} />}/>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;