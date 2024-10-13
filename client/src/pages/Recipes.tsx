import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import TRecipe from '../types/t_recipe';
import { getRecipes } from '../api/recipes';
import NavBar from '../components/NavBar';

const Recipes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchRecipes = (searchTerm : string) => {
      return getRecipes(searchTerm).then((response) => {
        return response.data.recipes.map((recipe : TRecipe) => {
          return { value: recipe.id, label: recipe.title };
        });
      }).catch((error) => {
      console.log('There was an error processing the request:', error);
      });
  };

  const onOptionSelected = (option : any) => {
    if (!option) return;

    navigate(`/recipes/${option.value}`);
  };

  return (
    <div id="recipes" className="h-full divide-y">
      <NavBar />
      <div className="flex flex-row justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            What are we cooking today, { user?.username }?
          </h2>
          <div className="py-5 text-gray-900">
            <AsyncSelect
              defaultOptions
              loadOptions={fetchRecipes}
              onChange={onOptionSelected}
              placeholder={`Some food, for example: Quesadillas`}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;