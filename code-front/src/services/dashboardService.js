import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const dashboardService = {
  headers: {},
  setCredentials: function() {
    const token = window.sessionStorage.getItem("token");
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  },

getFaturamentos: async function() {
    debugger
    this.setCredentials();
  try {
    const response = await axios.get(`${url}/faturamentos`, {headers: this.headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching faturamento', error);
    throw error;
  }
},

getAgendamentos: async function() {
    debugger
    this.setCredentials();
  try {
    const response = await axios.get(`${url}/agendamentos`, {headers: this.headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching agendamentos', error);
    throw error;
  }
},
getProdutos: async function() {
    debugger
    this.setCredentials();
  try {
    const response = await axios.get(`${url}/produtos`, {headers: this.headers});
    return response.data;
  } catch (error) {
    console.error('Error fetching produtos', error);
    throw error;
  }
},

fetchData4: async function() {
  debugger
  this.setCredentials();
try {
  const response = await axios.get(`${url}/produtos`, {headers: this.headers});
  return response.data;
} catch (error) {
  console.error('Error fetching kpi produtos', error);
  throw error;
}
},

};
export default dashboardService;
