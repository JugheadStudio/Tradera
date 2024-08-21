import axios from 'axios';

const API_URL = 'http://localhost:5219/api/Users';

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
};
