import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Sidebar from '../../components/SideBar/SideBar';
import estoqueService from '../../services/estoqueService';
import './estoque.css';

const Estoque = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false); // Controle do popup para produtos
  const [openCategoria, setOpenCategoria] = useState(false); // Controle do popup para categorias
  const [isEdit, setIsEdit] = useState(false); // Indica se é edição
  const [currentId, setCurrentId] = useState(null); // ID do item sendo editado
  const [categorias, setCategorias] = useState([]); // Adiciona estado para categorias
  const [newItem, setNewItem] = useState({
    quantidade: '',
    nome: '',
    descricao: '',
    unidadeMedida: '',
    preco: '',
    categoriaId: '' // Adiciona categoriaId ao estado do novo item
  });
  const [newCategoria, setNewCategoria] = useState({ nome: '' }); // Estado para nova categoria

  const fetchProdutos = async () => {
    try {
      const produtosData = await estoqueService.getProdutos();
      setRows(produtosData);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const categoriasData = await estoqueService.getCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
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
      preco: '',
      categoriaId: ''
    });
    setIsEdit(false);
    setCurrentId(null);
  };

  const handleOpenCategoria = () => {
    setOpenCategoria(true);
  };

  const handleCloseCategoria = () => {
    setOpenCategoria(false);
    setNewCategoria({ nome: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleCategoriaInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoria({ ...newCategoria, [name]: value });
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

  const handleAddCategoria = async () => {
    try {
      const categoriaData = await estoqueService.postCategoria(newCategoria);
      setCategorias([...categorias, categoriaData]);
      handleCloseCategoria();
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
    }
  };

  const handleEdit = (item) => {
    setNewItem({
      quantidade: item.quantidade,
      nome: item.nome,
      descricao: item.descricao,
      unidadeMedida: item.unidadeMedida,
      preco: item.preco,
      categoriaId: item.categoria.id
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
      <Button variant="contained" color="success" className="incluir-btn" onClick={handleOpen}>Incluir Produto</Button>
      <Button variant="contained" color="primary" className="incluir-categoria-btn" onClick={handleOpenCategoria}>Incluir Categoria</Button>
      <TableContainer>
        <Table className="estoque-table">
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Qtd</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Categoria</TableCell>
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
                  <TableCell>{row.categoria ? row.categoria.nome : 'Sem Categoria'}</TableCell>
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
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  Nenhum item encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup para incluir ou editar produto */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Editar Produto' : 'Incluir Novo Produto'}</DialogTitle>
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
            label="Quantidade"
            name="quantidade"
            fullWidth
            value={newItem.quantidade}
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
            fullWidth
            value={newItem.preco}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="categoria-label">Categoria</InputLabel>
            <Select
              labelId="categoria-label"
              name="categoriaId"
              value={newItem.categoriaId}
              onChange={handleInputChange}
            >
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>{categoria.nome}</MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>Nenhuma categoria disponível</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddItem}>{isEdit ? 'Salvar' : 'Adicionar'}</Button>
        </DialogActions>
      </Dialog>

      {/* Popup para incluir nova categoria */}
      <Dialog open={openCategoria} onClose={handleCloseCategoria}>
        <DialogTitle>Incluir Nova Categoria</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome da Categoria"
            name="nome"
            fullWidth
            value={newCategoria.nome}
            onChange={handleCategoriaInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategoria}>Cancelar</Button>
          <Button onClick={handleAddCategoria}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Estoque;
