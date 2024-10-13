import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const ShowRecipe = () => {
  const { id } = useParams();

  return (
    <div id="show-recipe" className="h-full divide-y">
      <NavBar />
      <div className="flex flex-row justify-center px-6 py-2 lg:px-8">
        <div>recipe: {id}</div>
      </div>
    </div>
  );
};

export default ShowRecipe;