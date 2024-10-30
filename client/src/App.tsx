import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LogIn from './pages/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import Recipes from './pages/Recipes';
import ShowRecipe from './pages/recipes/ShowRecipe';
import EditRecipe from './pages/recipes/EditRecipe';
import CreateRecipe from './pages/recipes/CreateRecipe';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute children={<Recipes />} />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/recipes">
            <Route path="new"  element={<ProtectedRoute children={<CreateRecipe />} />} />
            <Route path=":id"  element={<ProtectedRoute children={<ShowRecipe />} />} />
            <Route path=":id/edit"  element={<ProtectedRoute children={<EditRecipe />} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;