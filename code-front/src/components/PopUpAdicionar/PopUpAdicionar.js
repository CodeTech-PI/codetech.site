// src/components/PopUpAdicionar/PopUpAdicionar.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import clienteService from '../../services/clienteService';
import './PopUpAdicionar.css';

// Configurar o elemento raiz para o modal
Modal.setAppElement('#root');

const PopUpAdicionar = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteService.createUser(formData);
      onRequestClose();
      // Adicione qualquer outra lógica após a criação do usuário, como atualizar a lista de usuários
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      // Adicione lógica para lidar com o erro, como exibir uma mensagem ao usuário
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Formulário de Criação de Usuário"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Data de Nascimento:</label>
          <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </div>
        <button type="submit">Enviar</button>
        <button type="button" onClick={onRequestClose}>Fechar</button>
      </form>
    </Modal>
  );
};

export default PopUpAdicionar;
