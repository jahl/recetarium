import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe} from '../../api/recipes';
import NavBar from '../../components/NavBar';
import Editor from '../../components/Editor';
import InlineEditor from '../../components/InlineEditor';
import IngredientList from '../../components/IngredientList';
import TRecipeIngredient from '../../types/recipe_ingredient';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('New Recipe');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<TRecipeIngredient[]>([]);

  const onIngredientsUpdated = (updatedIngredients : TRecipeIngredient[]) => {
    setIngredients(updatedIngredients);
  }

  const onSubmit = async () => {
    try {
      const response = await createRecipe(title, description, ingredients);
      navigate(`/recipes/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id='show-recipe' className='h-full divide-y'>
      <NavBar />
      <div className='flex flex-col md:flex-row sm:items-center md:items-start'>
        <IngredientList ingredients={ingredients} onIngredientsUpdated={onIngredientsUpdated} />
        <div className='flex flex-col justify-center px-6 py-2 lg:px-8 w-3/4'>
          <InlineEditor value={title} onValueChanged={setTitle} />
          <div>
            <Editor content={description} onContentChanged={setDescription} />
          </div>
          <button
            className='rounded-md bg-orange-400 px-3 py-2 my-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400' 
            onClick={onSubmit}>
              Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;