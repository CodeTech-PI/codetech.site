
import React, { useEffect, useState } from "react";
import estoqueService from '../../services/estoqueService';
import Sidebar from '../../components/SideBar/SideBar';
import BotaoExcluir from '../../components/BotaoExcluir/BotaoExcluir';
import './ListaProdutos.css';
import listaProdutosService from "../../services/listaProdutosService";
import BotaoCliente from "../../components/BotaoCliente/BotaoCliente";

const ListaProdutos = () => {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);




  const fetchProdutos = async () => {
    try {
      const produtosData = await estoqueService.getProdutos();
      setProdutos(produtosData);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleBusca = (e) => {
    const query = e.target.value;
    setBusca(query);

    if (query.length > 2) {
      const produtosBuscados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(query.toLowerCase())
      );
      setProdutosFiltrados(produtosBuscados);
    } else {
      setProdutosFiltrados([]);
    }
  };

  const handleSelecionarProduto = (produto) => {
    setProdutosSelecionados((prevProdutos) => [
      ...prevProdutos,
      { ...produto, quantidade: 1 } 
    ]);
    setBusca('');
    setProdutosFiltrados([]);
  };

  const handleQuantidadeChange = (index, novaQuantidade) => {
    setProdutosSelecionados((prevProdutos) =>
      prevProdutos.map((produto, i) =>
        i === index ? { ...produto, quantidade: novaQuantidade } : produto
      )
    );
  };

  const handleSalvarProdutos = async () => {
   
    const listaProdutosRequest = {
      produtos: produtosSelecionados.map((produto) => ({
        quantidade: produto.quantidade,
        agendamento: {
          id: 5, // Substituir pelo ID dinâmico de agendamento/atendimento
        },
        produto: {
          id: produto.id,
        },
      })),
    };
  
    try {
      // salvar os produtos
      const response = await listaProdutosService.postListaProdutos(listaProdutosRequest);
      
      console.log('Produtos salvos com sucesso:', response);
      
      setProdutosSelecionados([]);
    } catch (error) {
      console.error('Erro ao salvar produtos:', error);
    }
  };


  const handleDelete = (produtoId) => {
    
    setProdutosSelecionados((prevProdutos) =>
      prevProdutos.filter((produto) => produto.id !== produtoId)
    );
  };



  return (
    <section className="section-conteudo-inteiro">
      <Sidebar />
      <h1 className="h1-lista-produtos">Lista de produtos</h1> 
      <input
        className="inputBusca"
        type="text"
        placeholder="Buscar produto..."
        value={busca}
        onChange={handleBusca}
      />

      <div className="div-test">
        {busca.length > 2 && produtosFiltrados.length > 0 && (
          <ul className="ul-opcoes">
            {produtosFiltrados.map(produto => (
              <li key={produto.id} onClick={() => handleSelecionarProduto(produto)}>
                {produto.nome}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="conteudo-total-lista-produtos"> 
        {produtosSelecionados.length > 0 && (
          <ul className="ul-produtos-selecionados">
            {produtosSelecionados.map((produto, index) => (
              <li key={index} className="produto-selecionado">
                <div className="qtd-produto">
                <span className="span-produto">{produto.nome}</span>
                <div className="quantidade-controle">
                  
                  <input className="input-qtd"
                    type="number"
                    value={produto.quantidade}
                    onChange={(e) => handleQuantidadeChange(index, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  </div>
            
                </div>
                <BotaoExcluir  onClick={() => handleDelete(produto.id)}/>
              </li>
            ))}
          </ul>
        )}
        <BotaoCliente
        nomeBotao = 'Salvar'
        onClick={handleSalvarProdutos}
        />
      </div>

     
    </section>
  );
};

export default ListaProdutos;
