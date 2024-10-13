import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../api/auth';
import { Link } from 'react-router-dom';
import getRandomFoodEmoji from '../utils/getRandomEmoji';


const NavBar = () => {
  const navigate = useNavigate();
  const [emoji] = useState(getRandomFoodEmoji());
  const { setUser } = useAuth();

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
    <nav className="bg-white border-b-1 border-gray-200">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <h1 className="text-xl text-slate-900">
          Recetarium {emoji}
        </h1>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={onLogOut}>Log Out</button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link to="/" className="block py-2 px-3 md:p-0 text-slate-900 hover:text-slate-500">Recipes</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;