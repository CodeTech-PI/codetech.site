// src/services/AuthService.js

import axios from 'axios';

const url = "http://sap-alfadev-app:8095";

const loginService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${url}/User/login`, { email, password });
      return response.data; // Retorna os dados da resposta
    } catch (error) {
      throw error; // Repassa o erro para ser tratado no componente
    }
  },
};

export default loginService;
