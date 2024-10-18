import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const loginService = {
  login: async (email, senha) => {
    debugger
    try {
      const response = await axios.post(`${url}/lombardi/login`, { email, senha });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default loginService;
