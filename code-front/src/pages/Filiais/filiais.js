import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import BotaoAlterarIcon from "../../components/BotaoAlterarIcon/BotaoAlterarIcon";
import BotaoExcluirIcon from "../../components/BotaoExcluirIcon/BotaoExcluirIcon";
import BotaoRosa from "../../components/BotaoRosa/BotaoRosa";
import PopUp from "../../components/PopUp/PopUp";
import filiaisService from "../../services/filiaisService";
import './filiais.css';

const Filial = () => {
  const [filiais, setFiliais] = useState([]);
  const [filteredFiliais, setFilteredFiliais] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentFilial, setCurrentFilial] = useState(null);
  const [filter, setFilter] = useState('');

  const fetchFilial = async () => {
    try {
      const filiaisData = await filiaisService.getFiliais();
      setFiliais(filiaisData);
      setFilteredFiliais(filiaisData);
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

    if (value) {
      const filtered = filiais.filter(filial =>
        filial.logradouro.toLowerCase().includes(value.toLowerCase()) ||
        filial.cidade.toLowerCase().includes(value.toLowerCase()) ||
        filial.estado.toLowerCase().includes(value.toLowerCase()) ||
        filial.complemento.toLowerCase().includes(value.toLowerCase()) ||
        filial.cep.toLowerCase().includes(value.toLowerCase()) ||
        filial.bairro.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFiliais(filtered);
    } else {
      setFilteredFiliais(filiais);
    }
  };

  const handleCreateFilial = async (newFilial) => {
    try {
      const createdFilial = await filiaisService.createFilial(newFilial);
      setFiliais([...filiais, createdFilial]);
      setFilteredFiliais([...filteredFiliais, createdFilial]);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar filial:', error);
    }
  };

  const handleEditFilial = async (updatedFilial) => {
    try {
      const updatedData = await filiaisService.updateFilial(currentFilial.id, updatedFilial);
      setFiliais(filiais.map(filial => (filial.id === currentFilial.id ? updatedData : filial)));
      setFilteredFiliais(filteredFiliais.map(filial => (filial.id === currentFilial.id ? updatedData : filial)));
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
      <Sidebar 
      
      />
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
