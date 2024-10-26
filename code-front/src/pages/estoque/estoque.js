import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Sidebar from '../../components/SideBar/SideBar';
import estoqueService from '../../services/estoqueService';
import './estoque.css';

const Estoque = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false); // Controle do popup
  const [isEdit, setIsEdit] = useState(false); // Indica se é edição
  const [currentId, setCurrentId] = useState(null); // ID do item sendo editado
  const [newItem, setNewItem] = useState({
    quantidade: '',
    nome: '',
    descricao: '',
    unidadeMedida: '',
    preco: ''
  });

  const fetchProdutos = async () => {
    try {
      const produtosData = await estoqueService.getProdutos();
      setRows(produtosData);
      console.log(produtosData, "testeProdutos");
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewItem({
      quantidade: '',
      nome: '',
      descricao: '',
      unidadeMedida: '',
      preco: ''
    });
    setIsEdit(false);
    setCurrentId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = async () => {
    try {
      if (isEdit) {
        // Chama a função de update
        const updatedData = await estoqueService.updateProduto(currentId, newItem);
        setRows(rows.map((row) => (row.id === currentId ? updatedData : row)));
      } else {
        // Chama a função de criação
        const produtoData = await estoqueService.postProduto(newItem);
        setRows([...rows, produtoData]);
      }
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (item) => {
    setNewItem({
      quantidade: item.quantidade,
      nome: item.nome,
      descricao: item.descricao,
      unidadeMedida: item.unidadeMedida,
      preco: item.preco,
    });
    setCurrentId(item.id);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await estoqueService.deleteProduto(id);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <div className="estoque-container">
      <Sidebar />
      <h1>Estoque</h1>
      <Button variant="contained" color="success" className="incluir-btn" onClick={handleOpen}>Incluir</Button>
      <TableContainer>
        <Table className="estoque-table">
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Qtd</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {rows.length > 0 ? (
    rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.nome}</TableCell>
        <TableCell>{row.quantidade}</TableCell>
        <TableCell>{row.preco}</TableCell>
        <TableCell>
          <div className="action-buttons">
            <Button variant="outlined" color="primary" onClick={() => handleEdit(row)}>Editar</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.id)}>Excluir</Button>
          </div>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={4} style={{ textAlign: 'center' }}>
        Nenhum item encontrado
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>

      {/* Popup para incluir ou editar item */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Editar Item' : 'Incluir Novo Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            name="nome"
            fullWidth
            value={newItem.nome}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Descrição"
            name="descricao"
            fullWidth
            value={newItem.descricao}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Quantidade"
            name="quantidade"
            type="number"
            fullWidth
            value={newItem.quantidade}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Unidade de Medida"
            name="unidadeMedida"
            fullWidth
            value={newItem.unidadeMedida}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Preço"
            name="preco"
            type="number"
            fullWidth
            value={newItem.preco}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancelar</Button>
          <Button onClick={handleAddItem} color="primary">{isEdit ? 'Salvar' : 'Adicionar'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Estoque;
