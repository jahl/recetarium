import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editRecipe, getRecipeById } from '../../api/recipes';
import NavBar from '../../components/NavBar';
import Editor from '../../components/Editor';
import InlineEditor from '../../components/InlineEditor';

const EditRecipe = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      const response = await getRecipeById(id);
      const recipe = response.data.recipe;

      setTitle(recipe.title);
      setDescription(recipe.description);
    };

    fetchRecipe();
  }, [id]);

  const onSubmit = async () => {
    if (!id) return;

    try {
      const response = await editRecipe(id, title, description);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="show-recipe" className="h-full divide-y">
      <NavBar />
      <div className="flex flex-col justify-center px-6 py-2 lg:px-8">
        <InlineEditor value={title} onValueChanged={setTitle} />
        <button onClick={onSubmit}>Save</button>
        <div>
          <Editor content={description} onContentChanged={setDescription} />
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;