// src/components/PopUpAdicionar/PopUpAdicionar.js

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import clienteService from "../../services/clienteService";
import "./PopUpAdicionar.css";
import BotaoFechar from "../BotaoFechar/BotaoFechar";
import BotaoCliente from "../BotaoCliente/BotaoCliente";

Modal.setAppElement("#root");

const PopUpAdicionar = ({ isOpen, onRequestClose, onCreate, cliente }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente); // Preencher os campos com os dados do cliente se estiver editando
    } else {
      setFormData({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        telefone: "",
      });
    }
  }, [cliente, isOpen]); // Atualiza os dados quando o cliente muda ou o modal abre

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cliente) {
        // Se um cliente estiver definido, chamamos a função de atualização
        await clienteService.updateCliente(cliente.id, formData);
      } else {
        // Se não houver cliente, chamamos a função de criação
        await clienteService.createUser(formData);
      }
      onCreate(); // Chama a função onCreate após a criação ou atualização
      onRequestClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Formulário de Criação/Atualização de Usuário"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <h2 className="title-popup">
        {cliente ? "Editar Usuário" : "Criar Usuário"}
      </h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="labels">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labels">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labels">Data de Nasc</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labels">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labels">Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-container">
          <button className="botao-alterar-adicionar" type="submit">{cliente ? 'Alterar' : 'Adicionar'}</button>
          <BotaoFechar type="button" onClick={onRequestClose} />
        </div>
      </form>
    </Modal>
  );
};

export default PopUpAdicionar;
