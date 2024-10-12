import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../api/auth';

const Recipes = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const onLogOut = async () => {
    try {
      await logOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log('There was an issue logging you out:', error);
    }
  };

  return (
    <div id="recipes" className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <button onClick={onLogOut}>Log Out</button>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-6xl text-center min-w-full block py-5">
          Recetarium 🍖
        </h1>
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          What are we cooking today, { user?.username}?
        </h2>
        <div>
          <input type="text" name="search" placeholder="test" />
        </div>
      </div>
    </div>
  );
};

export default Recipes;