import axios from 'axios';

export const getRecipes = async (searchTerm : string) => {
  return await axios.get(`/recipes?search_term=${searchTerm}`);
}