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

  const fetchProdutos = async () => {
    try {
      const produtosData = await estoqueService.getProdutos();
      setRows(produtosData);
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
                        onClick={() => handleDelete(row.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                  Nenhum item encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup para incluir ou editar produto */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="css-rvoa5x-MuiTypography-root-MuiDialogTitle-root">
          {isEdit ? "Editar Produto" : "Incluir Novo Produto"}
        </DialogTitle>
        <DialogContent className="css-dialog-content">
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            className="css-text-field"
            value={newItem.nome}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite o nome do produto"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="quantidade"
            className="css-text-field"
            type="number"
            value={newItem.quantidade}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite a quantidade"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="descricao"
            className="css-text-field"
            value={newItem.descricao}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite a descrição"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="unidadeMedida"
            className="css-text-field"
            value={newItem.unidadeMedida}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite a unidade de medida"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="preco"
            className="css-text-field"
            type="number"
            value={newItem.preco}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Digite o preço"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <FormControl
            variant="outlined"
            margin="dense"
            className="css-text-field"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          >
            <Select
              name="categoriaId"
              value={newItem.categoria.id}
              onChange={handleInputChange}
              displayEmpty
              inputProps={{ "aria-label": "Categoria" }}
              className="css-select-field"
            >
              <MenuItem value={0} disabled>
                Selecione uma categoria
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
          <BotaoCliente
            onClick={handleAddItem}
            nomeBotao={isEdit ? "Atualizar" : "Adicionar"}
          />
          <BotaoCliente onClick={handleClose} nomeBotao="Cancelar" />
        </DialogActions>
      </Dialog>

      {/* Popup para incluir categoria */}
      <Dialog open={openCategoria} onClose={handleCloseCategoria}>
        <DialogTitle className="css-rvoa5x-MuiTypography-root-MuiDialogTitle-root">
          Incluir Nova Categoria
        </DialogTitle>
        <DialogContent className="css-dialog-content">
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            className="css-text-field"
            value={newCategoria.nome}
            onChange={handleCategoriaInputChange}
            variant="outlined"
            placeholder="Digite o nome da categoria"
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <BotaoCliente
            onClick={handleAddCategoria}
            nomeBotao="Adicionar"
          />
          <BotaoCliente onClick={handleCloseCategoria} nomeBotao="Cancelar" />
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Duração de 3 segundos
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Estoque;
