// src/components/PopUpAdicionar/PopUpAdicionar.js

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import googleApiService from "../../services/googleApiService";
import "./PopUpAdicionar.css";
import BotaoFechar from "../BotaoFechar/BotaoFechar";

Modal.setAppElement("#root");

const PopUpAdicionar = ({ isOpen, onRequestClose, onCreate, handleSubmit, isEditing, agendamento }) => {
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
  });

  useEffect(() => {
    if (isEditing && agendamento) {
      setFormData({
        summary: agendamento.summary,
        description: agendamento.description,
        startDateTime: agendamento.startDateTime,
        endDateTime: agendamento.endDateTime,
      });
    } else {
      setFormData({
        summary: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
      });
    }
  }, [isEditing, agendamento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Formulário de Criação de Agendamento"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <h2 className="title-popup">{isEditing ? "Editar Agendamento" : "Criar Agendamento"}</h2>
      <form onSubmit={(e) => handleSubmit(e, formData)} className="form-container">
        <div className="form-group">
          <label className="labels">Resumo</label>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labels">Descrição</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labels">Data e Hora de Início</label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labels">Data e Hora de Fim</label>
          <input
            type="datetime-local"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-container">
          <button className="botao-alterar-adicionar" type="submit">{isEditing ? "Salvar Alterações" : "Adicionar"}</button>
          <BotaoFechar type="button" onClick={onRequestClose} />
        </div>
      </form>
    </Modal>
  );
};

export default PopUpAdicionar;
