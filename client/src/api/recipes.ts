import axios from 'axios';

export const IndexRecipes = () => {
  return axios.get('/recipes/')
}