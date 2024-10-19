import React, { useState, useEffect } from 'react';
import PopUpAdicionar from '../../components/PopUpAdicionar/PopUpAdicionar';
import clienteService from '../../services/clienteService';

const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);

  const fetchClientes = async () => {
    try {
      const clientesData = await clienteService.getClientes();
      setClientes(clientesData);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

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
      setEditModalIsOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await clienteService.deleteCliente(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const handleCreate = async () => {
    await fetchClientes(); // Atualiza a lista de clientes após adicionar um novo cliente
  };

  return (
    <div>
      <h1>Clientes</h1>
      <button onClick={openModal}>Adicionar Usuário</button>
      <PopUpAdicionar isOpen={modalIsOpen} onRequestClose={closeModal} onCreate={handleCreate} />
      <div>
        {clientes.map((cliente) => (
          <div key={cliente.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', backgroundColor: '#333', color: '#fff' }}>
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>CPF:</strong> {cliente.cpf}</p>
            <p><strong>E-mail:</strong> {cliente.email}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>Dt. Nasc.:</strong> {cliente.dataNascimento}</p>
            <button onClick={() => handleEdit(cliente)}>Alterar</button>
            <button onClick={() => handleDelete(cliente.id)}>Excluir</button>
          </div>
        ))}
      </div>
      {editModalIsOpen && currentCliente && (
        <div className="edit-modal">
          <h2>Editar Cliente</h2>
          <form onSubmit={handleEditSubmit}>
            <label>
              Nome:
              <input type="text" name="nome" defaultValue={currentCliente.nome} />
            </label>
            <label>
              CPF:
              <input type="text" name="cpf" defaultValue={currentCliente.cpf} />
            </label>
            <label>
              E-mail:
              <input type="email" name="email" defaultValue={currentCliente.email} />
            </label>
            <label>
              Telefone:
              <input type="text" name="telefone" defaultValue={currentCliente.telefone} />
            </label>
            <label>
              Dt. Nasc.:
              <input type="date" name="dataNascimento" defaultValue={currentCliente.dataNascimento} />
            </label>
            <button type="submit">Salvar</button>
            <button type="button" onClick={closeEditModal}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cliente;
