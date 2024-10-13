import axios from 'axios';

export const getRecipeById = async (id : string) => {
  return await axios.get(`/recipes/${id}`);
}

export const getRecipes = async (searchTerm : string) => {
  return await axios.get(`/recipes?search_term=${searchTerm}`);
}

export const editRecipe = async (id : string, title : string, description : string) => {
  return await axios.put(`/recipes/${id}`, {
    title,
    description
  });
}