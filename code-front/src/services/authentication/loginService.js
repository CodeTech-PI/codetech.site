import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const loginService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${url}/User/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default loginService;
