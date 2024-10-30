import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const estoqueService = {
  headers: {},
  setCredentials: function() {
    const token = window.sessionStorage.getItem("token");
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  },
  
  postProduto: async function(userData) {
    this.setCredentials();
    try {
      const response = await axios.post(`${url}/produtos`, userData, { headers: this.headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProdutos: async function() {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/produtos`, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  deleteProduto: async function(id) {
    this.setCredentials();
    try {
      await axios.delete(`${url}/produtos/${id}`, { headers: this.headers });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  },

  updateProduto: async function(id, produtoData) {
    this.setCredentials();
    try {
      const response = await axios.put(`${url}/produtos/${id}`, produtoData, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }
};

export default estoqueService;