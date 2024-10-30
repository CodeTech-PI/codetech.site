// src/containers/Cliente/Cliente.js
import React, { useEffect, useState } from 'react';
import clienteService from '../../services/clienteService'; // Certifique-se de que o caminho está correto
import PopUpAdicionar from '../../components/PopUpAdicionar/PopUpAdicionar';
import Sidebar from '../../components/SideBar/SideBar';
import './cliente.css'; // Ou qualquer outro arquivo de estilo que você esteja usando
import BotaoAlterar from '../../components/BotaoAlterar/BotaoAlterar';
import BotaoExcluir from '../../components/BotaoExcluir/BotaoExcluir';
import BotaoCliente from '../../components/BotaoCliente/BotaoCliente';

const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [filter, setFilter] = useState('');

  const fetchClientes = async () => {
    try {
      const clientesData = await clienteService.getClientes();
      setClientes(clientesData);
      setFilteredClientes(clientesData);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value) {
      const filtered = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(value.toLowerCase()) ||
        cliente.cpf.includes(value) ||
        cliente.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClientes(filtered);
    } else {
      setFilteredClientes(clientes);
    }
  };

  const handleEdit = (cliente) => {
    setCurrentCliente(cliente);
    setEditModalIsOpen(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const updatedCliente = {
      nome: event.target.nome.value,
      cpf: event.target.cpf.value,
      email: event.target.email.value,
      telefone: event.target.telefone.value,
      dataNascimento: event.target.dataNascimento.value,
    };

    try {
      const updatedData = await clienteService.updateCliente(currentCliente.id, updatedCliente);
      setClientes(clientes.map(cliente => (cliente.id === currentCliente.id ? updatedData : cliente)));
      setFilteredClientes(filteredClientes.map(cliente => (cliente.id === currentCliente.id ? updatedData : cliente)));
      setEditModalIsOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await clienteService.deleteCliente(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
      setFilteredClientes(filteredClientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  const openModal = () => {
    setCurrentCliente(null); // Limpa a informação do cliente atual ao abrir o modal
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const handleCreate = async () => {
    await fetchClientes();
  };

  return (
    <div className="container-total">
      <Sidebar />
      <div className="content">
        <h1>Clientes</h1>
        <input
          type="text"
          placeholder="Filtrar por nome, CPF ou e-mail"
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />

        <BotaoCliente
          onClick={openModal}
          nomeBotao='Adicionar Usuário'
        />
        <PopUpAdicionar isOpen={modalIsOpen} onRequestClose={closeModal} onCreate={handleCreate} />
        {editModalIsOpen && (
          <PopUpAdicionar isOpen={editModalIsOpen} onRequestClose={closeEditModal} onCreate={handleCreate} cliente={currentCliente} />
        )}

        <div className="clientes-list">
          {Array.isArray(filteredClientes) && filteredClientes.length > 0 ? (
            filteredClientes.map((cliente) => (
              <div key={cliente.id} className="cliente-item">
                <div className="container-cliente-info">
                  <div className='cliente-info1'>
                    <p><strong>Nome:</strong> {cliente.nome}</p>
                    <p><strong>CPF:</strong> {cliente.cpf}</p>
                    <p><strong>E-mail:</strong> {cliente.email}</p>
                  </div>
                  <div className='cliente-info2'>
                    <p><strong>Telefone:</strong> {cliente.telefone}</p>
                    <p><strong>Data de Nascimento.:</strong> {cliente.dataNascimento}</p>
                  </div>
                </div>
                <div className="cliente-actions">
                  <BotaoAlterar
                    nomeBotao='Alterar'
                    onClick={() => handleEdit(cliente)}
                  />
                  <BotaoExcluir
                    onClick={() => handleDelete(cliente.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </div>

        {editModalIsOpen && currentCliente && (
          <PopUpAdicionar isOpen={editModalIsOpen} onRequestClose={closeEditModal} onCreate={handleCreate} cliente={currentCliente} />
        )}
      </div>
    </div>
  );
};

export default Cliente;
