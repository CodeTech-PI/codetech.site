// src/services/clienteService.js

import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const clienteService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${url}/usuarios`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      debugger
      const response = await axios.post(`${url}/usuarios`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getClientes: async () => {
    try {
      const response = await axios.get(`${url}/usuarios`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },
  deleteCliente: async (id) => {
    try {
      await axios.delete(`${url}/usuarios/${id}`);
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      throw error;
    }
  },
  updateCliente: async (id, clienteData) => {
    try {
      const response = await axios.put(`${url}/usuarios/${id}`, clienteData);
      return response.data;
    }
    catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  }
};

export default clienteService;

