import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import dashboardService from '../../services/dashboardService';
import Sidebar from '../../components/SideBar/SideBar';
import './Dashboard.css';
import { BiLeftArrow } from 'react-icons/bi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data1, setData1] = useState(null); // Dados de lucro por mês
  const [data2, setData2] = useState(null); // Dados de agendamentos por mês
  const [data3, setData3] = useState(null); // Dados de produtos por categoria
  const [baixoEstoque, setBaixoEstoque] = useState(null); // Produto com menor quantidade
  const [mediaAtendimento, setMediaAtendimento] = useState(null); // Média mensal de agendamentos
  const [lucroAnual, setLucroAnual] = useState(null); // Lucro anual

  // Função para buscar os dados e preparar para os gráficos
  const fetchData = async () => {
    try {
      const dashFaturamento = await dashboardService.getFaturamentos(); // Dados de lucro por agendamento
      const dashAtendimento = await dashboardService.getAgendamentos(); // Dados dos agendamentos
      const dashProdutos = await dashboardService.getProdutos();

      // Processa os dados de lucro por mês
      if (dashFaturamento && dashFaturamento.length > 0) {
        const lucroPorMes = {};
        let totallucroAnual = 0; // Variável para calcular o lucro anual

        dashFaturamento.forEach(item => {
          const mesAno = new Date(item.ordemServico.agendamento.dt).toLocaleString('default', { month: 'short', year: 'numeric' });
          if (lucroPorMes[mesAno]) {
            lucroPorMes[mesAno] += item.lucro;
          } else {
            lucroPorMes[mesAno] = item.lucro;
          }
          totallucroAnual += item.lucro; // Soma o lucro para calcular o lucro anual
        });

        const labels1 = Object.keys(lucroPorMes);
        const values1 = Object.values(lucroPorMes);

        setData1({
          labels: labels1,
          datasets: [{
            label: 'Lucro Mensal',
            data: values1,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cor do fundo das barras
            borderColor: 'transparent', // Remove as linhas
            borderWidth: 0, // Remove as linhas
            fill: true // Preenche a área abaixo da barra
          }]
        });

        setLucroAnual(totallucroAnual); // Define o lucro anual no estado
      }

      // Processa os dados de agendamentos por mês e calcula a média mensal
      if (dashAtendimento && dashAtendimento.length > 0) {
        const agendamentosPorMes = {};

        dashAtendimento.forEach(item => {
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
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Cor do fundo das barras
            borderColor: 'transparent', // Remove as linhas
            borderWidth: 0, // Remove as linhas
            fill: true // Preenche a área abaixo da barra
          }]
        });

        const totalAgendamentos = values2.reduce((sum, value) => sum + value, 0);
        const mediaMensal = Math.round(totalAgendamentos / labels2.length); // Arredonda para inteiro

        setMediaAtendimento(mediaMensal);
      }

      // Processa os dados de produtos por categoria e encontra o produto com menor quantidade
      if (dashProdutos && dashProdutos.length > 0) {
        const produtosPorCategoria = {};
        let minProduct = dashProdutos[0];

        // Agrupando os produtos por categoria e encontrando o produto com menor quantidade
        dashProdutos.forEach(item => {
          const categoriaNome = item.categoria.nome; // A categoria que é retornada do backend
          if (produtosPorCategoria[categoriaNome]) {
            produtosPorCategoria[categoriaNome] += item.quantidade; // Somando a quantidade de produtos por categoria
          } else {
            produtosPorCategoria[categoriaNome] = item.quantidade;
          }

          if (item.quantidade < minProduct.quantidade) {
            minProduct = item;
          }
        });

        const labels3 = Object.keys(produtosPorCategoria); // Nomes das categorias
        const values3 = Object.values(produtosPorCategoria); // Quantidades de produtos por categoria

        setData3({
          labels: labels3,
          datasets: [{
            label: 'Quantidade de Produtos por Categoria',
            data: values3,
            backgroundColor: '#5B85DB',
            fill: true
          }]
        });

        setBaixoEstoque(minProduct);
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

      <div className='div-kpi'>
        {/* KPI de Produto com Menor Quantidade */}
      <div className={`kpi-container ${baixoEstoque && baixoEstoque.quantidade < 5 ? 'alert' : ''}`}>
        <h2>Item com Baixo Estoque</h2>
        {baixoEstoque ? (
          <span>
          <p className='produto-baixo-estoque'>{baixoEstoque.nome} </p>
          <p>{baixoEstoque.quantidade}</p>
          </span>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
      
      {/* KPI de Média Mensal de Agendamentos */}
      <div className="kpi-container">
        <h2>Média Mensal de Agendamentos</h2>
        {mediaAtendimento ? (
          <p>{mediaAtendimento}</p>
        ) : (
          <p>Carregando...</p>
        )}
      </div>

      {/* KPI de Lucro Anual */}
      <div className="kpi-containerAnual">
        <h2>Lucro Anual</h2>
        {lucroAnual !== null ? (
          <p>R$ {lucroAnual.toFixed(2)}</p>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
      </div>
      
      <div className='div-grafico'>
        {/* Dashboard de Lucro Mensal */}
      <div className="chart-containerLucro">
        <h2>Lucro Mensal</h2>
        {data1 ? (
          <Bar data={data1} options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: '',
                color: '#fff',
                font: {
                  size: 16
                }
              },
              tooltip: {
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff'
              }
            },
            scales: {
              x: {
                grid: {
                  color: '#333' // Cor das linhas do eixo X
                },
                ticks: {
                  color: '#fff' // Cor dos números no eixo X
                }
              },
              y: {
                grid: {
                  color: '#333' // Cor das linhas do eixo Y
                },
                ticks: {
                  color: '#fff' // Cor dos números no eixo Y
                }
              }
            }
          }} />
        ) : (
          <p>Carregando...</p>
        )}
      </div>
      </div>

      <div className='div-graficos-dupla'>
      {/* Dashboard de Produtos por Categoria */}
      <div className="chart-container">
        <h2>Qtd de Produtos em Estoque por Categoria</h2>
  {data3 ? (
    <Bar 
      data={data3} 
      options={{
        responsive: true,
        plugins: {
          // title: {
          //   display: true,
          //   text: 'Produtos por Categoria',
          //   color:'#FB3F83',
          //   font: {
          //     size: 14
          //   }
          // },
          legend: { 
            display: true, 
            position: "bottom",
            labels: { 
              color: '#515151', 
              font: { 
                size: 10,
                weight: 'bold',
                boxWidth: 5, // Largura do quadrado de cor da legenda 
          }}},
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff'
          }
        },
        scales: {
          x: {
            grid: {
              display: true, 
              drawBorder: true,
              borderColor: '#fff',
              drawTicks: false,
            },
            ticks: {
              color: '#fff',
            }
          },
          y: {
            grid: {
              display: true, 
              drawBorder: true,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              color: '#fff',
              stepSize: 2,
            }
          }
        }
      }}
    />
  ) : (
    <p>Carregando...</p>
  )}
</div>

      
       {/* Dashboard de Agendamentos por Mês */}
       <div className="chart-container">
        <h2>Agendamentos por Mês</h2>
        {data2 ? (
          <Bar data={data2} options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: '',
                color: '#fff',
                font: {
                  size: 16
                }
              },
              tooltip: {
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff'
              }
            },
            scales: {
              x: {
                grid: {
                  color: '#ffffff00' // Cor das linhas do eixo X
                },
                ticks: {
                  color: '#fff' // Cor dos números no eixo X
                }
              },
              y: {
                grid: {
                  color: '#ffffff00' // Cor das linhas do eixo Y
                },
                ticks: {
                  color: '#fff' // Cor dos números no eixo Y
                }
              }
            }
          }} />
        ) : (
          <p>Carregando...</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
