import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { editRecipe, getRecipeById } from '../../api/recipes';
import NavBar from '../../components/NavBar';
import Editor from '../../components/Editor';
import InlineEditor from '../../components/InlineEditor';
import IngredientList from '../../components/IngredientList';
import TRecipeIngredient from '../../types/recipe_ingredient';

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<TRecipeIngredient[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(id);
        const recipe = response.data.recipe;

        setTitle(recipe.title);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    fetchRecipe();
  }, [id]);

  const onIngredientsUpdated = (updatedIngredients : TRecipeIngredient[]) => {
    setIngredients(updatedIngredients);
  }

  const onSubmit = async () => {
    if (!id) return;

    try {
      await editRecipe(id, title, description, ingredients);
      navigate(`/recipes/${id}`);
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

export default EditRecipe;