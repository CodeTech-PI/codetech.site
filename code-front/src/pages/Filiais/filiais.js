import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import BotaoAlterarIcon from "../../components/BotaoAlterarIcon/BotaoAlterarIcon";
import BotaoExcluirIcon from "../../components/BotaoExcluirIcon/BotaoExcluirIcon";
import BotaoRosa from "../../components/BotaoRosa/BotaoRosa";
import PopUp from "../../components/PopUp/PopUp";
import filiaisService from "../../services/filiaisService";
import './filiais.css';
import { Modal } from 'react-modal';

const Filial = () => {
  const [filiais, setFiliais] = useState([]);
  const [filteredFiliais, setFilteredFiliais] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentFilial, setCurrentFilial] = useState(null);
  const [filter, setFilter] = useState('');
  const [filiaisOperacionais, setFiliaisOperacionais] = useState([]);
  const [filiaisInoperantes, setFiliaisInoperantes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("todos");


  const fetchFilial = async () => {
    try {
      const filiaisData = await filiaisService.getFiliais();
  
      // Normalizar os status das filiais
      const normalizedFiliais = filiaisData.map(filial => ({
        ...filial,
        status: filial.status.trim().toUpperCase(),
      }));
  
      setFiliais(normalizedFiliais);
      setFilteredFiliais(normalizedFiliais);
    } catch (error) {
      console.error('Erro ao buscar filiais:', error);
    }
  };

  useEffect(() => {
    fetchFilial();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  
    // Se o valor de filtro for preenchido
    if (value) {
      const filtered = filiais.filter(filial =>
        (filial.logradouro ? filial.logradouro.toLowerCase() : '')
          .includes(value.toLowerCase()) ||
        (filial.cidade ? filial.cidade.toLowerCase() : '')
          .includes(value.toLowerCase()) ||
        (filial.estado ? filial.estado.toLowerCase() : '')
          .includes(value.toLowerCase()) ||
        (filial.complemento ? filial.complemento.toLowerCase() : '')
          .includes(value.toLowerCase()) ||
        (filial.cep ? filial.cep.toLowerCase() : '')
          .includes(value.toLowerCase()) ||
        (filial.bairro ? filial.bairro.toLowerCase() : '')
          .includes(value.toLowerCase())
      );
      setFilteredFiliais(filtered);
    } else {
      // Caso o campo de filtro esteja vazio, retorna todas as filiais
      setFilteredFiliais(filiais);
    }
  };
  

 

const handleStatusFilter = (status) => {
    setSelectedStatus(status);

    if (status === 'operacional') {
      setFilteredFiliais(filiais.filter(filial => filial.status.trim().toUpperCase() === 'OPERANTE'));
    } else if (status === 'inoperante') {
      setFilteredFiliais(filiais.filter(filial => filial.status.trim().toUpperCase() === 'INOPERANTE'));
    } else {
      setFilteredFiliais(filiais);
    }
  };

  const handleCreateFilial = async (newFilial) => {
    try {
      const status = newFilial.status ? newFilial.status.trim().toUpperCase() : 'INOPERANTE'; // Garantir que o status seja maiúsculo ou o valor padrão
  
      const createdFilial = await filiaisService.createFilial({
        ...newFilial,
        status: status, // Garantindo que o status esteja em maiúsculo
      });
  
      // Normalizar o status
      createdFilial.status = createdFilial.status.trim().toUpperCase();
  
      const updatedFiliais = [...filiais, createdFilial];
      setFiliais(updatedFiliais);
      setFilteredFiliais(updatedFiliais);
  
      const operacionais = updatedFiliais.filter(f => f.status === 'OPERANTE');
      const inoperantes = updatedFiliais.filter(f => f.status === 'INOPERANTE');
      setFiliaisOperacionais(operacionais);
      setFiliaisInoperantes(inoperantes);
  
      setModalIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar filial:', error);
    }
  };
  


  const handleEditFilial = async (updatedFilial) => {
    try {
      const updatedData = await filiaisService.updateFilial(currentFilial.id, updatedFilial);
  
      // Normalizar o status
      updatedData.status = updatedData.status.trim().toUpperCase();
  
      const updatedFiliais = filiais.map(filial => 
        filial.id === currentFilial.id ? updatedData : filial
      );
      setFiliais(updatedFiliais);
      setFilteredFiliais(updatedFiliais);
  
      setEditModalIsOpen(false);
    } catch (error) {
      console.error('Erro ao editar filial:', error);
    }
  };

  const handleDeleteFilial = async (id) => {
    try {
      await filiaisService.deleteFilial(id);
      setFiliais(filiais.filter(filial => filial.id !== id));
      setFilteredFiliais(filteredFiliais.filter(filial => filial.id !== id));
    } catch (error) {
      console.error('Erro ao excluir filial:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    setCurrentFilial(null);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEdit = (filial) => {
    setCurrentFilial(filial);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  

  return (
    <div className="container-total">
      <Sidebar/>
      <div className="content">
        <h1>Filiais</h1>
        <div className="div-org">
          <input
            type="text"
            placeholder="Filtrar por cidade, estado ou bairro"
            value={filter}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <div className="status-filter">
            <button
            id="botao-status"
              onClick={() => handleStatusFilter('todos')}
              className={selectedStatus === 'todos' ? 'active' : ''}
            >
              Todas
            </button>
            <button
            id="botao-status"
              onClick={() => handleStatusFilter('operacional')}
              className={selectedStatus === 'operacional' ? 'active' : ''}
            >
              Operacionais
            </button>
            <button
            id="botao-status"
              onClick={() => handleStatusFilter('inoperante')}
              className={selectedStatus === 'inoperante' ? 'active' : ''}
            >
              Inoperantes
            </button>
            </div>

          <BotaoRosa
            onClick={openModal}
            nomeBotao="Incluir Filial"
          />
        </div>

        {/* PopUp para criar nova filial */}
        <PopUp
          isOpen={modalIsOpen}
          onSubmit={handleCreateFilial}
          initialData={{}}
          fields={[
            { name: "logradouro", label: "Logradouro" },
            { name: "cidade", label: "Cidade" },
            { name: "estado", label: "Estado" },
            { name: "complemento", label: "Complemento" },
            { name: "cep", label: "CEP" },
            { name: "num", label: "Número", type: "number" },
            { name: "bairro", label: "Bairro" },
            {
              name: "status",
              label: "Status",
              type: "checkboxes",
              options: [
                { label: "Operante", value: "OPERANTE" },
                { label: "Inoperante", value: "INOPERANTE" },
              ],
              validation: (selectedOptions) => selectedOptions.length <= 1, // Permite apenas uma opção
            },
          ]}
          title="Incluir Filial"
          submitButtonLabel="Salvar"
          onRequestClose={closeModal}
        />

        {/* PopUp para editar filial existente */}
        {editModalIsOpen && (
          <PopUp
            isOpen={editModalIsOpen}
            onRequestClose={closeEditModal}
            onSubmit={handleEditFilial}
            initialData={currentFilial || {}}
            fields={[
              { name: "logradouro", label: "Logradouro" },
              { name: "cidade", label: "Cidade" },
              { name: "estado", label: "Estado" },
              { name: "complemento", label: "Complemento" },
              { name: "cep", label: "CEP" },
              { name: "num", label: "Número", type: "number" },
              { name: "bairro", label: "Bairro" },
              { name: 'status', label: 'Status', type: 'select', options: ['OPERANTE', 'INOPERANTE'] },
            ]}
            title="Editar Filial"
            submitButtonLabel="Salvar"
          />
        )}

        <div className="filiais-list">
          {Array.isArray(filteredFiliais) && filteredFiliais.length > 0 ? (
            filteredFiliais.map(filial => (
              <div key={filial.id} className="filial-item">
                <div className="container-filial-info">
                  <p><strong>Logradouro:</strong><span className='span-space'> {filial.logradouro}</span></p>
                  <p><strong>Cidade:</strong><span className='span-space'> {filial.cidade}</span></p>
                  <p><strong>Estado:</strong><span className='span-space'> {filial.estado}</span></p>
                </div>
                <div className="container-filial-info2">
                  <p><strong>Bairro:</strong><span className='span-space'> {filial.bairro}</span></p>
                  <p><strong>Complemento:</strong><span className='span-space'> {filial.complemento}</span></p>
                  <p><strong>CEP:</strong><span className='span-space'> {filial.cep}</span></p>
                </div>
                <div className="container-filial-info3">
                  <p><strong>Número:</strong> {filial.num}</p>
                  <p><strong>Status:</strong> {filial.status}</p>
                </div>

                <div className="filial-actions">

                  <BotaoAlterarIcon
                    nomeBotao="Alterar"
                    onClick={() => handleEdit(filial)}
                    altText='Ícone de alteração'
                  />

                  <BotaoExcluirIcon
                    onClick={() => handleDeleteFilial(filial.id)}
                    altText='Ícone de excluir'
                  />

                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma filial encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filial;
