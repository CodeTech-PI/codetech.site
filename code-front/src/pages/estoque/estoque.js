import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Snackbar,
  Alert
} from "@mui/material";
import estoqueService from "../../services/estoqueService";
import "./estoque.css";
import BotaoCliente from "../../components/BotaoCliente/BotaoCliente";
import BotaoAlterar from '../../components/BotaoAlterar/BotaoAlterar';
import BotaoExcluir from '../../components/BotaoExcluir/BotaoExcluir';
import Sidebar from "../../components/SideBar/SideBar";

const Estoque = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCategoria, setOpenCategoria] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [newItem, setNewItem] = useState({
    quantidade: 0,
    nome: "",
    descricao: "",
    unidadeMedida: "",
    preco: 0,
    categoria: {
      id: 0,
      nome: "",
    },
  });
  const [newCategoria, setNewCategoria] = useState({ nome: "" });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [produtoFiltro, setProdutoFiltro] = useState(""); // Estado para filtro de produto
  const [categoriaFiltro, setCategoriaFiltro] = useState(""); // Estado para filtro de categoria

  const fetchProdutos = async () => {
    try {
      const produtosData = await estoqueService.getProdutos();
      setRows(produtosData);
      setFilteredRows(produtosData); // Inicializa o estado de produtos filtrados
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const categoriasData = await estoqueService.getCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  const handleFilterChange = () => {
    const filtered = rows.filter((row) => {
      const matchesProduto = row.nome.toLowerCase().includes(produtoFiltro.toLowerCase());
      const matchesCategoria = categoriaFiltro === "" || (row.categoria && row.categoria.nome === categoriaFiltro);
      return matchesProduto && matchesCategoria;
    });
    setFilteredRows(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [produtoFiltro, categoriaFiltro, rows]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewItem({
      quantidade: 0,
      nome: "",
      descricao: "",
      unidadeMedida: "",
      preco: 0,
      categoria: {
        id: 0,
        nome: "",
      },
    });
    setIsEdit(false);
    setCurrentId(null);
  };

  const handleOpenCategoria = () => {
    setOpenCategoria(true);
  };

  const handleCloseCategoria = () => {
    setOpenCategoria(false);
    setNewCategoria({ nome: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoriaId") {
      const selectedCategoria = categorias.find(
        (categoria) => categoria.id === parseInt(value)
      );
      setNewItem({
        ...newItem,
        categoria: { id: selectedCategoria.id, nome: selectedCategoria.nome },
      });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleCategoriaInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoria({ ...newCategoria, [name]: value });
  };

  const handleAddItem = async () => {
    try {
      if (isEdit) {
        const updatedData = await estoqueService.updateProduto(
          currentId,
          newItem
        );
        setRows(rows.map((row) => (row.id === currentId ? updatedData : row)));
        setSnackbarMessage("Produto atualizado com sucesso!");
      } else {
        const produtoData = await estoqueService.postProduto(newItem);
        setRows([...rows, produtoData]);
        setSnackbarMessage("Produto adicionado com sucesso!");
      }
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleAddCategoria = async () => {
    try {
      const categoriaData = await estoqueService.postCategoria(newCategoria);
      setCategorias([...categorias, categoriaData]);
      setSnackbarMessage("Categoria adicionada com sucesso!");
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
      handleCloseCategoria();
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  const handleEdit = (item) => {
    setNewItem({
      quantidade: item.quantidade,
      nome: item.nome,
      descricao: item.descricao,
      unidadeMedida: item.unidadeMedida,
      preco: item.preco,
      categoria: {
        id: item.categoria.id,
        nome: item.categoria.nome,
      },
    });
    setCurrentId(item.id);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await estoqueService.deleteProduto(id);
      setRows(rows.filter((row) => row.id !== id));
      setSnackbarMessage("Produto deletado com sucesso!");
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000); // Mantém a mensagem por 3 segundos
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div className="estoque-container">
      <Sidebar />
      <h1>Estoque</h1>
      <div className='botoes-incluir'>
        <BotaoCliente
          onClick={handleOpen}
          nomeBotao='Incluir Produto'
        />
        <BotaoCliente
          onClick={handleOpenCategoria}
          nomeBotao='Incluir Categoria'
        />
      </div>

      {/* Filtros de produto e categoria */}
      <div className="filtros">
  <TextField
    label="Filtrar Produto"
    variant="outlined"
    value={produtoFiltro}
    onChange={(e) => setProdutoFiltro(e.target.value)}
    className="textField" // Aplica a classe CSS
  />
  <FormControl variant="outlined" style={{ minWidth: 120 }}>
    <Select
      value={categoriaFiltro}
      onChange={(e) => setCategoriaFiltro(e.target.value)}
      displayEmpty
      inputProps={{ "aria-label": "Categoria" }}
    >
      <MenuItem value="">
        Todas as Categorias
      </MenuItem>
      {categorias.map((categoria) => (
        <MenuItem key={categoria.id} value={categoria.nome}>
          {categoria.nome}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>

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
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.quantidade}</TableCell>
                  <TableCell>{row.preco}</TableCell>
                  <TableCell>
                    {row.categoria ? row.categoria.nome : "Sem Categoria"}
                  </TableCell>
                  <TableCell>
                    <div className="action-buttons">
                      <BotaoAlterar
                        nomeBotao='Editar'
                        onClick={() => handleEdit(row)}
                      />
                      <BotaoExcluir
                        nomeBotao='Excluir'
                        onClick={() => handleDelete(row.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Nenhum produto encontrado</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar para mensagens de sucesso */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Dialog para adicionar/editar produto */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Editar Produto" : "Adicionar Produto"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome"
            type="text"
            fullWidth
            value={newItem.nome}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="descricao"
            label="Descrição"
            type="text"
            fullWidth
            value={newItem.descricao}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="unidadeMedida"
            label="Unidade de Medida"
            type="text"
            fullWidth
            value={newItem.unidadeMedida}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="quantidade"
            label="Quantidade"
            type="number"
            fullWidth
            value={newItem.quantidade}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="preco"
            label="Preço"
            type="number"
            fullWidth
            value={newItem.preco}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <Select
              name="categoriaId"
              value={newItem.categoria.id || ""}
              onChange={handleInputChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>Selecione uma Categoria</em>
              </MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="botao-cancelar">Cancelar</button>
          <button onClick={handleAddItem}>Salvar</button>
        </DialogActions>
      </Dialog>

      {/* Dialog para adicionar categoria */}
      <Dialog open={openCategoria} onClose={handleCloseCategoria}>
        <DialogTitle>Adicionar Categoria</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome da Categoria"
            type="text"
            fullWidth
            value={newCategoria.nome}
            onChange={handleCategoriaInputChange}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseCategoria} className="botao-cancelar">Cancelar</button>
          <button onClick={handleAddCategoria}>Salvar</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Estoque;
