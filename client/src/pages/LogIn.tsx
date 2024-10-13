import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import getRandomFoodEmoji from '../utils/getRandomEmoji';

const LogIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emoji] = useState(getRandomFoodEmoji());

  const { setUser } = useAuth();

  const onSubmit = async () => {
    try {
      const response = await logIn(username, password);
      const currentUser = response.data.user;
      setUser(currentUser);
      navigate('/');
    } catch (error) {
      console.error('Could not log in:', error);
    }
  };

  return (
    <div id="login" className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <span className="text-6xl text-center min-w-full block py-5">
          {emoji}
        </span>
        <h1 className="text-3xl pt-3 text-center">
          Recetarium
        </h1>
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="username" >
              Username
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 outline-none"
                id="username"
                name="username"
                required
                type="text"
                onChange={(e) => { setUsername(e.target.value) }}
                value={username} />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="password" >
              Password
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 outline-none" 
                id="password"
                name="password"
                required
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password} />
            </div>
          </div>

          <div>
            <button
              className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 "
              type="button"
              onClick={onSubmit} >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;