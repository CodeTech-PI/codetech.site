import React, { useEffect, useState } from 'react';
import googleApiService from '../../services/agendamentoService'; // Certifique-se de que o caminho está correto
import PopUpAdicionar from '../../components/PopUpAdicionarApi/PopUpAdicionar';
import Sidebar from '../../components/SideBar/SideBar';
import './agendamento.css'; // Ou qualquer outro arquivo de estilo que você esteja usando
import BotaoAlterar from '../../components/BotaoAlterar/BotaoAlterar';
import BotaoExcluir from '../../components/BotaoExcluir/BotaoExcluir';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import LinearProgress from '@mui/material/LinearProgress';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import InputAdornment from '@mui/material/InputAdornment';
import { createFilterOptions } from '@mui/material/Autocomplete';  // Remova a duplicação
import AlertTitle from '@mui/material/AlertTitle';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import ButtonBase from '@mui/material/ButtonBase';
import CardHeader from '@mui/material/CardHeader';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import useAutocomplete from '@mui/material/useAutocomplete';
import useLazyRipple from '@mui/material/useLazyRipple';

const Agendamento = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentAgendamento, setCurrentAgendamento] = useState(null);
  const [filter, setFilter] = useState('');

  const fetchAgendamentos = async () => {
    try {
      debugger
      const agendamentosData = await googleApiService.getAgendamentoApi();
      setAgendamentos(agendamentosData);
      setFilteredAgendamentos(agendamentosData);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value) {
      const filtered = agendamentos.filter(agendamento =>
        agendamento.summary.toLowerCase().includes(value.toLowerCase()) ||
        agendamento.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAgendamentos(filtered);
    } else {
      setFilteredAgendamentos(agendamentos);
    }
  };

  const handleEdit = (agendamento) => {
    setCurrentAgendamento(agendamento);
    setEditModalIsOpen(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const updatedAgendamento = {
      ...currentAgendamento, // Manter o UUID existente
      summary: event.target.summary.value,
      description: event.target.description.value,
      startDateTime: event.target.startDateTime.value,
      endDateTime: event.target.endDateTime.value,
    };

    try {
      const updatedData = await googleApiService.updateAgendamentoApi(updatedAgendamento.id, updatedAgendamento);
      setAgendamentos(agendamentos.map(agendamento => (agendamento.id === updatedAgendamento.id ? updatedData : agendamento)));
      setFilteredAgendamentos(filteredAgendamentos.map(agendamento => (agendamento.id === updatedAgendamento.id ? updatedData : agendamento)));
      setEditModalIsOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
    }
  };

  const openModal = () => {
    setCurrentAgendamento(null); // Limpa a informação do agendamento atual ao abrir o modal
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const newAgendamento = {
      // id: uuidv4(), // Gerar UUID para o novo agendamento
      summary: event.target.summary.value,
      description: event.target.description.value,
      startDateTime: event.target.startDateTime.value,
      endDateTime: event.target.endDateTime.value,
    };
  
    try {
      const createdAgendamento = await googleApiService.postAgendamentoApi(newAgendamento);
      setAgendamentos([...agendamentos, createdAgendamento]);
      setFilteredAgendamentos([...filteredAgendamentos, createdAgendamento]);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    }
  };
  

  const handleCreate = async () => {
    await fetchAgendamentos();
  };

  return (
    <div className="container-total">
      <Sidebar />
      <div className="content">
        <h1>Agendamentos</h1>
        <input
          type="text"
          placeholder="Filtrar por resumo ou descrição"
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />

        <button onClick={openModal}>Adicionar Agendamento</button>
        <PopUpAdicionar
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onCreate={handleCreate}
          handleSubmit={handleCreateSubmit}
          isEditing={false}
        />
        {editModalIsOpen && (
          <PopUpAdicionar
            isOpen={editModalIsOpen}
            onRequestClose={closeEditModal}
            onCreate={handleCreate}
            handleSubmit={handleEditSubmit}
            agendamento={currentAgendamento}
            isEditing={true}
          />
        )}

        <div className="agendamentos-list">
          {Array.isArray(filteredAgendamentos) && filteredAgendamentos.length > 0 ? (
            filteredAgendamentos.map((agendamento) => (
              <div key={agendamento.id} className="agendamento-item">
                <div className="container-agendamento-info">
                  <div className='agendamento-info1'>
                    <p><strong>Resumo:</strong> {agendamento.summary}</p>
                    <p><strong>Descrição:</strong> {agendamento.description}</p>
                  </div>
                  <div className='agendamento-info2'>
                    <p><strong>Data de Início:</strong> {new Date(agendamento.startDateTime).toLocaleString()}</p>
                    <p><strong>Data de Término:</strong> {new Date(agendamento.endDateTime).toLocaleString()}</p>
                  </div>
                </div>
                <div className="agendamento-actions">
                  <BotaoAlterar
                    nomeBotao='Alterar'
                    onClick={() => handleEdit(agendamento)}
                  />
                  {/* <BotaoExcluir
                    onClick={() => handleDelete(agendamento.id)}
                  /> */}
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum agendamento encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agendamento;
