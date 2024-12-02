import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const agendamentoService = {
  headers: {},
  setCredentials: function() {
    const token = window.sessionStorage.getItem("token");
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  },
  
  postAgendamento: async function(userData) {
    this.setCredentials();
    try {
      const response = await axios.post(`${url}/agendamentos`, userData, { headers: this.headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAgendamento: async function(id) {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/agendamentos/${id}`, { headers: this.headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  postOrdemServico: async function(userData) {
    this.setCredentials();
    try {
      const response = await axios.post(`${url}/ordens-servicos`, userData, { headers: this.headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFaturamentoPorId: async function(id) {
    this.setCredentials();
    try {
      const response = await axios.get(`${url}/faturamentos/${id}`, { headers: this.headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }


//   getClientes: async function() {
//     this.setCredentials();
//     try {
//       const response = await axios.get(`${url}/usuarios`, { headers: this.headers });
//       return response.data;
//     } catch (error) {
//       console.error('Erro ao buscar clientes:', error);
//       throw error;
//     }
//   },

//   deleteCliente: async function(id) {
//     this.setCredentials();
//     try {
//       await axios.delete(`${url}/usuarios/${id}`, { headers: this.headers });
//     } catch (error) {
//       console.error('Erro ao deletar cliente:', error);
//       throw error;
//     }
//   },

//   updateCliente: async function(id, clienteData) {
//     this.setCredentials();
//     try {
//       const response = await axios.put(`${url}/usuarios/${id}`, clienteData, { headers: this.headers });
//       return response.data;
//     } catch (error) {
//       console.error('Erro ao atualizar cliente:', error);
//       throw error;
//     }
//   }
};

export default agendamentoService;
