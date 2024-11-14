import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dashboardService from '../../services/dashboardService';
import Sidebar from '../../components/SideBar/SideBar';
import './Dashboard.css';

// Registra os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data1, setData1] = useState(null); // Dados de lucro por mês
  const [data2, setData2] = useState(null); // Dados de agendamentos por mês
  const [data3, setData3] = useState(null); // Dados de produtos por categoria

  // Função para buscar os dados e preparar para os gráficos
  const fetchData = async () => {
    try {
      const response1 = await dashboardService.fetchData1(); // Dados de lucro por agendamento
      const response2 = await dashboardService.fetchData2(); // Dados dos agendamentos
      const response3 = await dashboardService.fetchData3(); // Dados de produtos por categoria

      // Processa os dados de lucro por mês
      if (response1 && response1.length > 0) {
        const lucroPorMes = {};

        response1.forEach(item => {
          const mesAno = new Date(item.ordemServico.agendamento.dt).toLocaleString('default', { month: 'short', year: 'numeric' });
          if (lucroPorMes[mesAno]) {
            lucroPorMes[mesAno] += item.lucro;
          } else {
            lucroPorMes[mesAno] = item.lucro;
          }
        });

        const labels1 = Object.keys(lucroPorMes);
        const values1 = Object.values(lucroPorMes);

        setData1({
          labels: labels1,
          datasets: [{
            label: 'Lucro Mensal',
            data: values1,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        });
      }

      // Processa os dados de agendamentos por mês
      if (response2 && response2.length > 0) {
        const agendamentosPorMes = {};

        response2.forEach(item => {
          const mesAno = new Date(item.dt).toLocaleString('default', { month: 'short', year: 'numeric' });
          if (agendamentosPorMes[mesAno]) {
            agendamentosPorMes[mesAno] += 1;
          } else {
            agendamentosPorMes[mesAno] = 1;
          }
        });

        const labels2 = Object.keys(agendamentosPorMes);
        const values2 = Object.values(agendamentosPorMes);

        setData2({
          labels: labels2,
          datasets: [{
            label: 'Qtd de Atendimentos Mensais',
            data: values2,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        });
      }

      // Processa os dados de produtos por categoria
      if (response3 && response3.length > 0) {
        const produtosPorCategoria = {};

        // Agrupando os produtos por categoria, considerando o nome da categoria
        response3.forEach(item => {
          const categoriaNome = item.categoria.nome; // A categoria que é retornada do backend
          if (produtosPorCategoria[categoriaNome]) {
            produtosPorCategoria[categoriaNome] += item.quantidade; // Somando a quantidade de produtos por categoria
          } else {
            produtosPorCategoria[categoriaNome] = item.quantidade;
          }
        });

        const labels3 = Object.keys(produtosPorCategoria); // Nomes das categorias
        const values3 = Object.values(produtosPorCategoria); // Quantidades de produtos por categoria

        setData3({
          labels: labels3,
          datasets: [{
            label: 'Quantidade de Produtos por Categoria',
            data: values3,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        });
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // Chama a função fetchData quando o componente é montado
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      {/* Dashboard de Lucro Mensal */}
      <div className="chart-container">
        <h2>Lucro Mensal</h2>
        {data1 ? (
          <Bar data={data1} options={{ responsive: true }} />
        ) : (
          <p>Carregando...</p>
        )}
      </div>

      {/* Dashboard de Agendamentos por Mês */}
      <div className="chart-container">
        <h2>Agendamentos por Mês</h2>
        {data2 ? (
          <Bar data={data2} options={{ responsive: true }} />
        ) : (
          <p>Carregando...</p>
        )}
      </div>

      {/* Dashboard de Produtos por Categoria */}
      <div className="chart-container">
        <h2>Produtos por Categoria</h2>
        {data3 ? (
          <Bar data={data3} options={{ responsive: true }} />
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
