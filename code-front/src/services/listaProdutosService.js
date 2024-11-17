import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const listaProdutosService = {
  headers: {},
  setCredentials: function() {
    const token = window.sessionStorage.getItem("token");
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }, 
  
  postListaProdutos: async function(listaProdutosRequest) {
    this.setCredentials();
    try {
      const response = await axios.post(`${url}/lista-produtos`, listaProdutosRequest, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar lista de produtos:', error);
      throw error;
    }
  },


  getListaProdutos: async function() {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/lista-produtos`, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },



  deleteListaProdutos: async function(produtosIds) {
    this.setCredentials();
    try {
      await axios.delete(`${url}/lista-produtos`, {
        headers: this.headers,
        data: { produtosIds }  // Enviando os IDs no corpo da requisição
      });
    } catch (error) {
      console.error('Erro ao deletar produtos:', error);
      throw error;
    }
  },

  updateListaProduto: async function(id, produtoData) {
    this.setCredentials();
    try {
      const response = await axios.put(`${url}/lista-produtos/${id}`, produtoData, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  postListaCategoria: async function(userData) {
    this.setCredentials();
    try {
      const response = await axios.post(`${url}/lista-produtos`, userData, { headers: this.headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getListaCategorias: async function() {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/lista-produtos`, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  },

  searchProdutos: async function (query) {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/lista-produtos`, {
        headers: this.headers,
        params: { nome: query },  // envia a query para filtrar os produtos no backend
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

};

export default listaProdutosService;
