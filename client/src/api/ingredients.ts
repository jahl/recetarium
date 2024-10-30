import axios from 'axios';

export const getIngredients = async (searchTerm : string) => {
  return await axios.get(`/ingredients?search_term=${searchTerm}`);
}

export const createIngredient = async (name : string) => {
  return await axios.post(`/ingredients`, { name });
}

export const getIngredientsByRecipeId = async (recipeId : string) => {
  return await axios.get(`/ingredients/by-recipe/${recipeId}`);
}
