import axios from 'axios';

export const logIn = async (username : string, password : string) => {
  return await axios.post('/auth/login', {
    username,
    password
  }, { 
    withCredentials: true 
  });
};

export const logOut = async () => {
  return await axios.post('/auth/logout', {});
};

export const getCurrentUser = async () => {
  return await axios.get('/auth/current-user');
};