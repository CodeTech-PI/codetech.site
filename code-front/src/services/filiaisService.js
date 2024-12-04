import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const filiaisService = {
  headers: {},
  setCredentials: function() {
    const token = window.sessionStorage.getItem("token");
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  },
  
  createFilial: async function(filialData) {
    this.setCredentials();
    try {
      const response = await axios.post(`${url}/unidades`, filialData, { headers: this.headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFiliais: async function() {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/unidades`, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filias:', error);
      throw error;
    }
  },

  deleteFilial: async function(id) {
    this.setCredentials();
    try {
      await axios.delete(`${url}/unidades/${id}`, { headers: this.headers });
    } catch (error) {
      console.error('Erro ao deletar filial:', error);
      throw error;
    }
  },

  updateFilial: async function(id, filialData) {
    this.setCredentials();
    try {
      const response = await axios.put(`${url}/unidades/${id}`, filialData, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar filial:', error);
      throw error;
    }
  },

  async getFiliaisOperacionais() {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/operacional`, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar filiais operacionais:", error);
      throw error;
    }
  },

  async getFiliaisInoperantes() {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/inoperacional`, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar filiais inoperantes:", error);
      throw error;
    }
  },

  async tornarFilialOperacional(qtdOperacoes) {
    this.setCredentials();
    try {
      const response = await axios.post(
        `${url}/tornar-operacional/${qtdOperacoes}`,
        null,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao tornar filiais operacionais:", error);
      throw error;
    }
  },

  async buscarFilialPorId(id) {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/${id}`, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar filial por ID:", error);
      throw error;
    }
  },

  async criarFilial(filial) {
    this.setCredentials();
    try {
      const response = await axios.post(`${url}`, filial, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar filial:", error);
      throw error;
    }
  },

  async atualizarFilial(id, filialAtualizada) {
    this.setCredentials();
    try {
      const response = await axios.put(`${url}/${id}`, filialAtualizada, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar filial:", error);
      throw error;
    }
  }
};

export default filiaisService;